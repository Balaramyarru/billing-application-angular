import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { CartBottomSheetComponent } from '../cart-bottom-sheet/cart-bottom-sheet.component';
import { CartService } from '../Services/cart-service.service';
import { CommonService } from '../Services/commonservices.service';

@Component({
  selector: 'app-checkout-confirm-dialog',
  standalone: false,
  templateUrl: './checkout-confirm-dialog.component.html',
  styleUrls: ['./checkout-confirm-dialog.component.css']
})
export class CheckoutConfirmDialogComponent implements OnInit {
  cartItems: any[] = [];
  subtotal = 0;
  discount = 0;
  tax = 0;
  total = 0;

  isDiscountApplied = false;
  isTaxApplied = false;

  constructor(
    public dialogRef: MatDialogRef<CheckoutConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private cartService: CartService,
    private snackBar: MatSnackBar,
    private bottomSheet: MatBottomSheet,private customerService: CommonService
  ) {}

  ngOnInit() {
    // ✅ Always ensure cartItems is initialized safely
this.cartItems = this.data?.cartItems ?? this.cartService.getCartItems() ?? [];
    this.updateTotal();
  }

  updateTotal() {
    if (!this.cartItems || this.cartItems.length === 0) {
      this.subtotal = this.discount = this.tax = this.total = 0;
      return;
    }

    this.subtotal = this.cartItems
      .reduce((acc: number, item: any) => acc + item.price * item.quantity, 0);

    this.discount = this.isDiscountApplied ? this.subtotal * 0.1 : 0;
    const discountedTotal = this.subtotal - this.discount;

    this.tax = this.isTaxApplied ? discountedTotal * 0.18 : 0;
    this.total = discountedTotal + this.tax;
  }

  editCart() {
    this.dialogRef.close('edit');
    this.bottomSheet.open(CartBottomSheetComponent, {
      data: this.cartItems
    });
  }

 onCheckout() {
  if (!this.cartItems || this.cartItems.length === 0) return;

  // Call backend checkout API
  this.customerService.checkout(this.cartItems).subscribe({
    next: (res) => {
      // ✅ API succeeded
      this.cartService.clearCart(); // clear local cart
      this.dialogRef.close({ confirmed: true, total: this.total });

      this.snackBar.open('✅ Checkout successful!', 'Close', { duration: 3000 });
    },
    error: (err) => {
      // ❌ API failed
      console.error('Checkout failed', err);
      this.snackBar.open('❌ Checkout failed. Try again.', 'Close', { duration: 3000 });
    }
  });
}

}
