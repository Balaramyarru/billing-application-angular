import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService, InventoryItem } from '../Services/commonservices.service';




@Component({
  selector: 'app-item-inventory',
  standalone: false,
  templateUrl: './item-inventory.component.html',
  styleUrl: './item-inventory.component.css'
})
export class ItemInventoryComponent {
inventoryForm: FormGroup;
  displayedColumns: string[] = [
    'itemName', 'itemCode', 'salesRate', 'purchaseRate', 'wholesaleRate', 'units'
  ];
  inventoryList: InventoryItem[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private inventoryService: CommonService
  ) {
    this.inventoryForm = this.fb.group({
      itemName: ['', Validators.required],
      itemCode: ['', Validators.required],
      salesRate: [null, [Validators.required, Validators.min(1)]],
      purchaseRate: [null, [Validators.required, Validators.min(1)]],
      wholesaleRate: [null, [Validators.required, Validators.min(1)]],
      units: [null, [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit(): void {
    this.loadInventory();
      this.inventoryService.getAllItems().subscribe({
  next: (items) => {
    this.inventoryList = items;  // items is InventoryItem[]
  }
});
  }

  loadInventory() {
this.inventoryService.getAllItems().subscribe({
    next: (items) => {
      this.inventoryList = items || [];   // ✅ now it's an array
    },
    error: (err) => {
      console.error('Fetch failed', err);
      this.inventoryList = [];
    }
  });
}

addItem() {
  if (this.inventoryForm.valid) {
    const newItem: InventoryItem = this.inventoryForm.value;
    this.inventoryService.saveItem(newItem).subscribe({
      next: (savedItem) => {
        this.inventoryList = [...this.inventoryList, savedItem]; // ✅ works now
        this.inventoryForm.reset();
        alert('Item saved successfully!');
      },
      error: (err) => {
        console.error('Save failed', err);
        alert('Failed to save item.');
      }
    });
  }
}

  deleteItem(index: number) {
    this.inventoryList.splice(index, 1);
  }

}
