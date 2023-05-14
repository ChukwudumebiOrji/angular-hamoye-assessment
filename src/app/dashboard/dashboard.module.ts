import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { IndexComponent } from './index/index.component';
import { InProgressComponent } from './in-progress/in-progress.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { ModalComponent } from '../modal/modal.component';

@NgModule({
  declarations: [
    DashboardComponent,
    IndexComponent,
    InProgressComponent,
    ModalComponent,
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    DashboardRoutingModule,
  ],
})
export class DashboardModule {}
