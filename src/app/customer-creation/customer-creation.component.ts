import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonService, Customer } from '../Services/commonservices.service';


@Component({
  selector: 'app-customer-creation',
  standalone: false,
  templateUrl: './customer-creation.component.html',
  styleUrl: './customer-creation.component.css'
})
export class CustomerCreationComponent {

  customerForm: FormGroup;
  customers: Customer[] = []; // Live list

  constructor(private fb: FormBuilder, private customerService: CommonService) {
    this.customerForm = this.fb.group({
      customerName: ['', [Validators.required, Validators.minLength(3)]],
      mobile: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      email: ['', [Validators.required, Validators.email]],
      area: ['', Validators.required],
      type: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.loadCustomers(); // Load existing customers on component init
  }

  saveCustomer() {
    if (this.customerForm.valid) {
      const customer: Customer = this.customerForm.value;
      this.customerService.saveCustomer(customer).subscribe({
        next: (saved) => {
          alert('Customer created successfully!');
          this.customers.push(saved); // Update live list
          this.customerForm.reset();
        },
        error: (err) => {
          console.error('Error saving customer:', err);
          alert('Failed to create customer. Try again.');
        }
      });
    }
  }

  loadCustomers() {
   this.customerService.getAllCustomers().subscribe({
  next: (data) => {
    this.customers = data;  // ✅ always set to array
  },
  error: (err) => {
    console.error('Failed to fetch customers', err);
    this.customers = []; // fallback
  }
});

  }

  deleteCustomer(index: number) {
    this.customers.splice(index, 1); // For now, only local deletion
    // Optional: add backend DELETE API call here later
  }

}
