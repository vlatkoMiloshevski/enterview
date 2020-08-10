import { InterviewComponent } from './interview.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { InterviewRoutes } from './interview.routes';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { FeedbackTemplateComponent } from './feedback-template/feedback-template.component';
import { QuestionnaireComponent } from './questionnaire/questionnaire.component';
import { ReportProgressbarComponent } from './report-progressbar/report-progressbar.component';
import { DeleteDocumentDialogComponent } from '../shared/dialog/delete-document-dialog/delete-document-dialog.component';
import { CandidateListComponent } from './candidate-list/candidate-list.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
    declarations: [
        InterviewComponent,
        BarChartComponent,
        PieChartComponent,
        ReportProgressbarComponent,
        FeedbackTemplateComponent,
        QuestionnaireComponent,
        DeleteDocumentDialogComponent,
        CandidateListComponent,
    ],
    providers: [
    ],
    imports: [
        InterviewRoutes,
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        SharedModule,
        MDBBootstrapModule.forRoot(),
    ],
    exports: []
})
export class InterviewModule { }
