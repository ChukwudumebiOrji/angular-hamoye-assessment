import { IUser } from './../types/user';
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
  users: IUser[] = [];

  getUsers() {
    this.http
      .get('http://localhost:3000/users')
      .subscribe((val: any) => (this.users = val));
  }

  login(user: IUser) {
    const foundUser = this.users.find((u) => u.email === user.email);
    if (!foundUser || foundUser.password !== user.password) {
      throw new Error('Invalid credentials');
    } else {
      localStorage.setItem('isLoggedIn', JSON.stringify(true));
      this.router.navigate(['/dashboard']);
    }
  }

  logout() {
    localStorage.removeItem('isLoggedIn');
    this.router.navigate(['/login']);
  }
}
