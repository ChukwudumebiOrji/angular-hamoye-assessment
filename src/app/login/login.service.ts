import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient, private router: Router) {
    this.getUsers();
  }
  users: any[] = [];

  getUsers() {
    this.http
      .get('http://localhost:3000/users')
      .subscribe((val: any) => (this.users = val));
  }

  login(user: any) {
    const foundUser = this.users.find((u) => u.email === user.email);
    if (!foundUser || foundUser.password !== user.password) {
      throw new Error('Invalid credentials');
    } else {
      localStorage.setItem('isLoggedIn', 'true');
      this.router.navigate(['/dashboard']);
    }
  }
}
