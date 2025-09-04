import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { CartBottomSheetComponent } from '../cart-bottom-sheet/cart-bottom-sheet.component';
import { CartService } from '../Services/cart-service.service';
import { CommonService, InventoryItem, Invoice } from '../Services/commonservices.service';

interface Item {
  itemName: string;
  itemCode: string;
  salesRate: number;
  wholesaleRate: number;
  purchaseRate:number;
  quantity:number;
  units: string;
}

@Component({
  selector: 'app-sales-invoice',
  standalone: false,
  templateUrl: './sales-invoice.component.html',
  styleUrls: ['./sales-invoice.component.css']
})
export class SalesInvoiceComponent implements OnInit {
now: Date = new Date();
private clockId?: any;
invoiceId: string = this.generateInvoiceId();
  customerName = '';
  customerType = '';
  customerTypes = ['Retail', 'Wholesale','Purchase Rate'];

  items: InventoryItem[] = [];
  filteredItems: InventoryItem[] = [];
  searchControl = new FormControl<string>('', { nonNullable: true });
  markedForCart: Set<string> = new Set();
  selectedPriceKeyMap: { [key: string]: string } = {};
  totalCount = 0;
  dataSource: Invoice[] = [];

  // ✅ Add this line
  isLoading: boolean = true;
  cart: any[] = [];
displayedColumns: string[] = ['name', 'code', 'price', 'quantity', 'Stock'];

  constructor(
    private bottomSheet: MatBottomSheet,
    private cartService: CartService,
    private inventoryService: CommonService
  ) {}

  ngOnInit(): void {
    this.loadInventory();
  this.startClock();

    this.searchControl.valueChanges.subscribe(val => {
      const search = val.toLowerCase();
      this.filteredItems = this.items.filter(item =>
        item.itemName.toLowerCase().includes(search) ||
        item.itemCode.toLowerCase().includes(search)
      );
    });

    this.cartService.cartItems$.subscribe(items => {
      this.totalCount = items.reduce((acc, item) => acc + item.quantity, 0);
    });
        this.fetchInvoices();

  }

  ngOnDestroy(): void {
  if (this.clockId) clearInterval(this.clockId);
}

private startClock() {
  this.clockId = setInterval(() => (this.now = new Date()), 1000);
}

private generateInvoiceId(): string {
  const pad = (n: number) => n.toString().padStart(2, '0');
  const d = new Date();
  const datePart = `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}`;
  const timePart = `${pad(d.getHours())}${pad(d.getMinutes())}${pad(d.getSeconds())}`;
  return `INV-${datePart}-${timePart}`;
}


isDefaultPrice(item: InventoryItem, type: 'sales' | 'wholesale' | 'purchaseRate'): boolean {
  const key = this.selectedPriceKeyMap[item.itemCode] || this.defaultPriceKey(item);
  return key === type;
}




addToCart(item: any) {
  const existing = this.cart.find(c => c.itemCode === item.itemCode);
  if (existing) {
    existing.quantity += 1;
  } else {
    this.cart.push({ ...item, quantity: 1 });
  }
}
   fetchInvoices() {
    this.inventoryService.getInvoices().subscribe({
      next: (data) => {
        this.dataSource = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching invoices:', err);
        this.isLoading = false;
      }
    });
  }

  // ✅ Load inventory dynamically
  loadInventory() {
    this.inventoryService.getAllItems().subscribe({
      next: (data) => {
        this.items = data;
        console.log("loadInventory",data)
        this.filteredItems = data;
      },  
      error: (err) => console.error('Failed to load inventory', err)
    });
  }

  // Price selection
 defaultPriceKey(item: InventoryItem): 'sales' | 'wholesale' | 'purchaseRate' {
  if (this.customerType === 'Wholesale') return 'wholesale';
  if (this.customerType === 'Purchase Rate') return 'purchaseRate';
  return 'sales';
}


getSelectedPrice(item: InventoryItem): number {
  const key = this.selectedPriceKeyMap[item.itemCode] || this.defaultPriceKey(item);
  switch (key) {
    case 'wholesale': return item.wholesaleRate;
    case 'purchase':  return item.purchaseRate;
    default:          return item.salesRate;
  }
}


  onPriceOverride(item: InventoryItem, value: string) {
    this.selectedPriceKeyMap[item.itemCode] = value;
  }

  // Cart operations
  increment(item: InventoryItem) {
    const price = this.getSelectedPrice(item);
    this.cartService.addItem({ itemCode: item.itemCode, name: item.itemName, price, quantity: 1 });
  }

  decrement(item: InventoryItem) {
    this.cartService.removeOneQuantity(item.itemCode);
  }

  getCartQuantity(item: InventoryItem): number {
    return this.cartService.getItemQuantity(item.itemCode);
  }

  // Mark items
  isMarked(item: InventoryItem): boolean {
    return this.markedForCart.has(item.itemCode);
  }

  toggleMark(item: InventoryItem) {
    if (this.isMarked(item)) this.markedForCart.delete(item.itemCode);
    else this.markedForCart.add(item.itemCode);
  }

  addAllMarkedToCart() {
    this.markedForCart.forEach(code => {
      const item = this.items.find(i => i.itemCode === code);
      if (item) {
        const price = this.getSelectedPrice(item);
        this.cartService.addItem({ itemCode: item.itemCode, name: item.itemName, price, quantity: 1 });
      }
    });
    this.markedForCart.clear();
  }

  openCart() {
    if (this.totalCount === 0) {
      alert('Add at least one item before checkout!');
      return;
    }
    this.bottomSheet.open(CartBottomSheetComponent);
  }

  onCustomerTypeChange() {
    this.selectedPriceKeyMap = {};
  }

  // ✅ Checkout API call
  checkoutCart() {
    const cartItems = this.cartService.getCartItems().map(item => ({
      itemCode: item.itemCode,
      itemName: item.name,
      quantity: item.quantity,
      salesRate: item.price,
      wholesaleRate: item.price, // can be adjusted if needed
      purchaseRate :item.price,
      units: 1
    }));
    this.inventoryService.checkout(cartItems).subscribe({
      next: (res) => {
        alert('Checkout successful!');
        this.cartService.clearCart();
        this.loadInventory(); // refresh inventory stock
      },
      error: (err) => {
        console.error('Checkout failed', err);
        alert('Checkout failed. Please try again.');
      }
    });
  }
}
