import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'billing';


  constructor(public router: Router
  ) {
    // this.sessiontimeout.startTimer();
  }
  @HostListener('window:mousemove')
  @HostListener('window:keydown')
  resetTimer() {
    // this.sessiontimeout.resetTimer();
  }

}
