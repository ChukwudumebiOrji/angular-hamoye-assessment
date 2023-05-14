import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  constructor(private loginService: LoginService) {}

  ngOnInit(): void {}

  isModalOpen: boolean = false;

  openModal() {
    this.isModalOpen = true;
  }

  logout() {
    this.loginService.logout();
  }

  closeModal() {
    this.isModalOpen = false;
  }
}
