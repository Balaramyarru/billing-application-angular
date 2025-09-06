import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { loginBO } from '../Services/loginBO';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonService } from '../Services/commonservices.service';

@Component({
    selector: 'app-login',
    standalone: false,
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;  // Add the loginForm property

  loginBO ?: loginBO;

  constructor(private fb: FormBuilder,private commonservice :CommonService,private router: Router, private snackBar: MatSnackBar) {
    // Initialize the form with form controls
    this.loginForm = this.fb.group({
      username: ['', Validators.required],  // Username field with required validation
      password: ['', Validators.required]   // Password field with required validation
    });
  }
  navigateToSignup() {
    console.log("re routing")
    this.router.navigate(['/admin-registration-form']); // Navigates to the registration form
  }
  // Add the onSubmit function to handle form submission
  onSubmit() {
    if (this.loginForm.valid) {
      console.log('Form Submitted!', this.loginForm.value);
      this.doLogin();
    }
  }

  showMessage(message: string, type: 'info' | 'warn' | 'error') {
    let panelClass = '';
    switch (type) {
      case 'info':
        panelClass = 'snack-bar-info';
        break;
      case 'warn':
        panelClass = 'snack-bar-warn';
        break;
      case 'error':
        panelClass = 'snack-bar-error';
        break;
    }
  
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: [panelClass],
      horizontalPosition: 'right', 
      verticalPosition: 'top'
    });
}

  public doLogin(): void {
    this.loginBO = new loginBO();
    this.loginBO.username = this.loginForm.get("username")?.value;
    this.loginBO.password = this.loginForm.get("password")?.value;
console.log("this.loginBO.username",this.loginBO.username);
console.log("this.loginBO.password",this.loginBO.password);

    if (this.loginBO.username === '' || this.loginBO.password === '') {
      // this.commonservice.showToasterError("User Name and Password is Mandtory!");
      return;

    }
    const password = this.loginBO.password;
    this.commonservice.loginWithUserNameAndPass(this.loginBO).subscribe(res => {
      if (res.code == 'SR') {
        sessionStorage.setItem("userid", res.data);
        this.showMessage(`Login Sucessfull`, "info");
console.log("loginWithUserNameAndPass",res.data)
        this.router.navigate(['/item-inventory']); 

      } else if(res.code == 'ER') {
        this.showMessage(`Login Failed Please Check Userid and Password`, "info");

      }else {
        // this.commonservice.showToasterError(res.message);
      }

      (error: any) => {
        console.error("An error occurred:", error);

      }
    });

  }


}
