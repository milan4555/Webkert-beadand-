import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../shared/auth.service";
import {FormsModule} from "@angular/forms";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatCard, MatCardContent} from "@angular/material/card";
import {MatButton} from "@angular/material/button";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent implements OnInit {

  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {
    if (localStorage.getItem('user') != '') {
      router.navigate(['/dashboard']);
    }
  }

  ngOnInit(): void {

  }

  login() {
    if(this.email == '') {
      alert('Please enter a valid email');
      return;
    }

    if(this.password == '') {
      alert('Please enter a valid password');
      return;
    }

    this.authService.login(this.email, this.password);
    this.email = '';
    this.password = '';
  }

}
