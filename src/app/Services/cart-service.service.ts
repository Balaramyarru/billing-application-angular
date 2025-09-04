import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CartService {
  private cartItemsSubject = new BehaviorSubject<any[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();

  getCartItems() {
    return this.cartItemsSubject.value;
  }

  // ✅ Add item or increment quantity
  addItem(item: any) {
  const currentItems = this.getCartItems();
  const existingItem = currentItems.find(i => i.itemCode === item.itemCode);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    item.quantity = 1;
    item.marked = false;
    currentItems.push(item);
  }

  this.cartItemsSubject.next([...currentItems]);
}

  // ✅ Decrement quantity (alias for removeOneQuantity)
removeOneQuantity(itemCode: string) {
  const currentItems = this.getCartItems();
  const item = currentItems.find(i => i.itemCode === itemCode);

  if (item) {
    if (item.quantity > 1) {
      item.quantity -= 1;
    } else {
      this.removeItem(itemCode);
      return;
    }
  }

  this.cartItemsSubject.next([...currentItems]);
}


  // ✅ Remove item completely
  removeItem(itemCode: string) {
    const updatedItems = this.getCartItems().filter(i => i.itemCode !== itemCode);
    this.cartItemsSubject.next(updatedItems);
  }



  // ✅ Get current quantity of an item
  getItemQuantity(itemCode: string): number {
    const item = this.getCartItems().find(i => i.itemCode === itemCode);
    return item ? item.quantity : 0;
  }

  // ✅ Clear cart
  clearCart() {
    this.cartItemsSubject.next([]);
  }

  // ✅ Get total price
  getTotal() {
    return this.getCartItems().reduce((sum, i) => sum + (i.price * i.quantity), 0);
  }

  // ✅ Bulk update
  updateCart(items: any[]) {
    this.cartItemsSubject.next([...items]);
  }

  // ✅ Check if marked
  isMarked(itemCode: string): boolean {
    const item = this.getCartItems().find(i => i.itemCode === itemCode);
    return item ? item.marked === true : false;
  }

  // ✅ Toggle mark
  toggleMark(itemCode: string) {
    const currentItems = this.getCartItems();
    const item = currentItems.find(i => i.itemCode === itemCode);

    if (item) {
      item.marked = !item.marked;
      this.cartItemsSubject.next([...currentItems]);
    }
  }

  
}
