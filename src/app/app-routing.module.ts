import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ItemInventoryComponent } from './item-inventory/item-inventory.component';
import { CustomerCreationComponent } from './customer-creation/customer-creation.component';
import { SalesInvoiceComponent } from './sales-invoice/sales-invoice.component';
import { CheckoutConfirmDialogComponent } from './checkout-confirm-dialog/checkout-confirm-dialog.component';

const routes: Routes = [{ path: '', redirectTo: "login", pathMatch: "full" },
    { path: 'login', component: LoginComponent },
    { path: 'item-inventory', component: ItemInventoryComponent },
    { path: 'customer-creation', component: CustomerCreationComponent },
{ path: 'sales-invoice', component: SalesInvoiceComponent },
  { path: 'checkout-confirm', component: CheckoutConfirmDialogComponent },



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
