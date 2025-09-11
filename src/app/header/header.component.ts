import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
    selector: 'app-header',
   
    templateUrl: './header.component.html',
    styleUrl: './header.component.css'
})
export class HeaderComponent {

  isMenuOpen = false;

  constructor(private router: Router) {
  }

  toggleMobileMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
  
  navigateTocustomercreation() {
    console.log("re routing dealer-transactions")
    this.router.navigate(['/customer-creation']); 
  }

  navigateTosalesinvoice() {
    console.log("re routing dealer-transactions")
    this.router.navigate(['/sales-invoice']); 
  }
  
  
  // navigateTodealeronboard() {
  //   console.log("re routing dealer-onboarding")
  //   this.router.navigate(['/admin-registration-form']); 
  // }
  
  navigateToLogin() {
    this.router.navigate(['/login']); 
  }

  

}
