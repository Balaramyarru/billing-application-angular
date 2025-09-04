import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { CartService } from '../Services/cart-service.service';
import { CheckoutConfirmDialogComponent } from '../checkout-confirm-dialog/checkout-confirm-dialog.component';

interface CartItem {
  name: string;
  price: number;
  quantity: number;
  discount?: number;       // % discount
  applyDiscount?: boolean; // toggle ON/OFF
  tax?: number;            // % tax (optional)
}

@Component({
  selector: 'app-cart-bottom-sheet',
  standalone: false,
  templateUrl: './cart-bottom-sheet.component.html',
  styleUrls: ['./cart-bottom-sheet.component.css']
})
export class CartBottomSheetComponent implements OnInit, OnDestroy {
  cartItems: CartItem[] = [];
  private subscription!: Subscription;

  // breakdown fields
  subtotal = 0;
  discountAmount = 0;  // ✅ renamed for clarity
  taxAmount = 0;       // ✅ renamed for clarity
  finalTotal = 0;

  // toggles
  applyDiscount = false;
  applyTax = false;

  // configurable %
  discountRate = 10; // default 10%
  taxRate = 18;      // default 18%

  constructor(
    private bottomSheetRef: MatBottomSheetRef<CartBottomSheetComponent>,
    private snackBar: MatSnackBar,
    private cartService: CartService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.subscription = this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
      this.updateTotals();
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  F(item: CartItem): void {
    item.quantity++;
    this.cartService.updateCart(this.cartItems);
    this.updateTotals();
  }

  decrement(item: CartItem): void {
    if (item.quantity > 0) {
      item.quantity--;
      this.cartService.updateCart(this.cartItems);
      this.updateTotals();
    }
  }

  removeItem(item: CartItem): void {
    this.cartService.removeItem(item.name);
    this.snackBar.open('Item removed from cart!', 'Close', { duration: 2000 });
    this.updateTotals();
  }

  clearCart(): void {
    this.cartService.clearCart();
    this.snackBar.open('Cart cleared!', 'Close', { duration: 2000 });
    this.updateTotals();
  }

  updateTotals(): void {
    this.subtotal = this.cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity, 0);

    this.discountAmount = this.applyDiscount ? this.subtotal * (this.discountRate / 100) : 0;

    const discountedTotal = this.subtotal - this.discountAmount;

    this.taxAmount = this.applyTax ? discountedTotal * (this.taxRate / 100) : 0;

    this.finalTotal = discountedTotal + this.taxAmount;
  }

  checkout(): void {
    if (this.cartItems.length === 0) {
      this.snackBar.open('Add at least one item to checkout!', 'Close', { duration: 2000 });
      return;
    }

    this.bottomSheetRef.dismiss();
    this.dialog.open(CheckoutConfirmDialogComponent, {
      width: '400px',
      data: {
        customerName: '',
        customerType: '',
        items: this.cartItems,
        subtotal: this.subtotal,
        discount: this.discountAmount,
        tax: this.taxAmount,
        total: this.finalTotal
      }
    });
  }

  trackByName(index: number, item: CartItem): string {
    return item.name;
  }
  
}
