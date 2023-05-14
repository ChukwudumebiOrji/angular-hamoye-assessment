import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private fb: FormBuilder, private loginService: LoginService) {}

  loginError = false;

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  loginForm: FormGroup = new FormGroup({});

  onSubmit() {
    try {
      this.loginService.login(this.loginForm.value);
    } catch (error) {
      this.loginError = true;
      setTimeout(() => {
        this.loginError = false;
      }, 2000);
    }
  }
}
