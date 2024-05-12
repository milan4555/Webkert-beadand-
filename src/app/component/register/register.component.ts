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
    MatSlideToggleModule,
    MatCard,
    MatCardContent,
    MatButton
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})

export class RegisterComponent implements OnInit {

  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {
    if (localStorage.getItem('user') != '') {
      router.navigate(['/dashboard']);
    }
  }

  ngOnInit(): void { }

  register() {
    if(this.email == '') {
      alert('Please enter a valid email');
      return;
    }

    if(this.password == '') {
      alert('Please enter a valid password');
      return;
    }

    this.authService.register(this.email, this.password);
    this.email = '';
    this.password = '';
  }

}
