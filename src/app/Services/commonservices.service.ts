import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { loginBO } from './loginBO';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../environments/environment.prod';



export interface Customer {
  id?: number;
  customerName: string;
  mobile: string;
  email: string;
  area: string;
  type: string; // e.g. Retail, Wholesale
}


export interface InventoryItem {
  itemName: string;
  itemCode: string;
  salesRate: number;
  wholesaleRate: number;
  purchaseRate:number;
  units: number;
  quantity?: number; // for checkout
}

export interface Invoice {
  invoiceNumber: string;
  customerName: string;
  date: string;
  amount: number;
  status: string;
}

export interface ApiResponse<T> {
  code: string;
  message: string;
  data: T;
}

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private http: HttpClient) { }
    private apiBaseURL = environment.apiBaseUrl;


 private handleError(error: any) {
    console.error('API error:', error);
    return throwError(() => error);
  }

  // ---------------- INVOICES ----------------
  getInvoices(): Observable<Invoice[]> {
    return this.http.get<ApiResponse<Invoice[]>>(this.apiBaseURL + 'api/invoices')
      .pipe(
        map(res => res.data),
        catchError(this.handleError)
      );
  }

  // ---------------- LOGIN ----------------
  loginWithUserNameAndPass(login: loginBO): Observable<any> {
    return this.http.post<ApiResponse<any>>(this.apiBaseURL + 'aadhyalogin/login', login)
      .pipe(
        map(res => res.data),
        catchError(this.handleError)
      );
  }

  // ---------------- CUSTOMERS ----------------
  saveCustomer(customer: Customer): Observable<Customer> {
    return this.http.post<ApiResponse<Customer>>(this.apiBaseURL + 'api/customers/save', customer)
      .pipe(
        map(res => res.data),
        catchError(this.handleError)
      );
  }

  getAllCustomers(): Observable<Customer[]> {
    return this.http.get<ApiResponse<Customer[]>>(this.apiBaseURL + 'api/customers/all')
      .pipe(
        map(res => res.data),
        catchError(this.handleError)
      );
  }

  getCustomerById(id: number): Observable<Customer> {
    return this.http.get<ApiResponse<Customer>>(this.apiBaseURL + `api/customers/${id}`)
      .pipe(
        map(res => res.data),
        catchError(this.handleError)
      );
  }

  // ---------------- INVENTORY ----------------
  getAllItems(): Observable<InventoryItem[]> {
    return this.http.get<ApiResponse<InventoryItem[]>>(this.apiBaseURL + 'api/inventory/all')
      .pipe(
        map(res => res.data),
        catchError(this.handleError)
      );
  }

  saveItem(item: InventoryItem): Observable<InventoryItem> {
    return this.http.post<ApiResponse<InventoryItem>>(this.apiBaseURL + 'api/inventory/save', item)
      .pipe(
        map(res => res.data),
        catchError(this.handleError)
      );
  }

  checkout(cartItems: InventoryItem[]): Observable<any> {
    return this.http.post<ApiResponse<any>>(this.apiBaseURL + 'api/inventory/checkout', cartItems)
      .pipe(
        map(res => res.data),
        catchError(this.handleError)
      );
  }

  // Error handling
//   private handleError(error: HttpErrorResponse) {
//     let errorMsg = '';
//     if (error.error instanceof ErrorEvent) {
//       // Client-side error
//       errorMsg = `Error: ${error.error.message}`;
//     } else {
//       // Server-side error
//       errorMsg = `Error Code: ${error.status}, Message: ${error.message}`;
//     }
//     console.error(errorMsg);
//     return throwError(() => new Error(errorMsg));
//   }
// }

}
