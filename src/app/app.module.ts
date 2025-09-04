import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxUiLoaderModule, NgxUiLoaderConfig, PB_DIRECTION, NgxUiLoaderHttpModule } from 'ngx-ui-loader';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { ItemInventoryComponent } from './item-inventory/item-inventory.component';
import { CustomerCreationComponent } from './customer-creation/customer-creation.component';
import { SalesInvoiceComponent } from './sales-invoice/sales-invoice.component';
import { CartBottomSheetComponent } from './cart-bottom-sheet/cart-bottom-sheet.component';
import { CheckoutConfirmDialogComponent } from './checkout-confirm-dialog/checkout-confirm-dialog.component';
import { MatSelectModule } from '@angular/material/select';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatBadgeModule } from '@angular/material/badge';
import { HttpClientModule } from '@angular/common/http';

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  pbDirection: PB_DIRECTION.leftToRight,
  pbThickness: 5,
  fgsType: 'ball-spin-clockwise',
  fgsColor: '#1575df',
  overlayColor: 'rgba(237,238,239,0.8)',
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ItemInventoryComponent,
    CustomerCreationComponent,
    SalesInvoiceComponent,
    CartBottomSheetComponent,
    CheckoutConfirmDialogComponent,
      ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    RouterModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatCardModule,
    // Angular Material Modules
    MatListModule,
    MatDividerModule,
    MatBadgeModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatBottomSheetModule,
    MatSnackBarModule,
    MatCardModule,
    MatToolbarModule,
    ReactiveFormsModule,
    MatIconModule,
    MatMenuModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatTooltipModule,
    MatCardModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatPaginatorModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule, // Required for formGroup
    MatFormFieldModule,  // For mat-form-field
    MatInputModule,      // For matInput
    MatCardModule,       // For mat-card
    MatButtonModule,     // For buttons
    MatSnackBarModule,   // For snack bars
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    AppRoutingModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatSelectModule,
    MatDialogModule,
    MatBottomSheetModule,
    MatSnackBarModule,
    MatCardModule,
    MatFormFieldModule,
    MatToolbarModule, 
    FormsModule,
    MatSlideToggleModule,
    HttpClientModule,
    RouterModule,   // Third-Party Modules
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    NgxUiLoaderHttpModule.forRoot({ showForeground: true }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
