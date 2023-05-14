import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InProgressComponent } from './in-progress/in-progress.component';
import { IndexComponent } from './index/index.component';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'profile', component: InProgressComponent },
  { path: 'settings', component: InProgressComponent },
  { path: 'messages', component: InProgressComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
