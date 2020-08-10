import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InterviewComponent } from './interview.component';

const routes: Routes = [
  {
    path: '',
    component: InterviewComponent,
    data: { browserTitle: 'Front End' },
    canActivate: [],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InterviewRoutes { }
