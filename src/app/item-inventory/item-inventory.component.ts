import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService, InventoryItem } from '../Services/commonservices.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';




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
  dataSource = new MatTableDataSource<any>([]);
  searchControl = new FormControl('');
  filteredItems: InventoryItem[] = [];
  items: InventoryItem[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
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


     // ✅ Search / Filter
    this.searchControl.valueChanges.subscribe(val => {
      this.dataSource.filter = val?.trim().toLowerCase() || '';
    });

    // Customize filter to search in multiple columns
    this.dataSource.filterPredicate = (data: InventoryItem, filter: string) => {
      const searchStr = filter.toLowerCase();
      return data.itemName.toLowerCase().includes(searchStr) ||
             data.itemCode.toLowerCase().includes(searchStr);
    };
  
   

      this.inventoryService.getAllItems().subscribe({
  next: (items) => {
    this.inventoryList = items;  // items is InventoryItem[]
  }
});
  }

 loadInventory() {
    this.inventoryService.getAllItems().subscribe({
      next: (items) => {
        this.dataSource.data = items || [];
      },
      error: (err) => {
        console.error('Fetch failed', err);
        this.dataSource.data = [];
      }
    });
  }

 ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }




addItem() {
  if (this.inventoryForm.valid) {
    const newItem: InventoryItem = this.inventoryForm.value;
    this.inventoryService.saveItem(newItem).subscribe({
      next: (savedItem) => {
        // ✅ Reload table data after success
        this.loadInventory();

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
