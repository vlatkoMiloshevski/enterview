import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    data: { browserTitle: 'Enterview' },
    canActivate: [],
  },
  {
    path: 'interview/:id',
    loadChildren: () => import('./interview/interview.module').then(m => m.InterviewModule),
    data: { browserTitle: 'Front End' },
    canActivate: [],
  },
  {
    path: '**',
    redirectTo: '/error',
  },
];


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
