import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ImportDocumentDialogData } from '../shared/models/import-document-dialog-data.model';
import { ImportDocumentDialogComponent } from '../shared/dialog/import-document-dialog/import-document-dialog.component';
import { InterviewModel } from './dashboard.model';
import { v4 as uuidv4 } from 'uuid';
import { QuestionnaireModel } from '../shared/models/questionnarie.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  routerUrl: string;
  selectedCategoryDocuments: any;
  interviewList: InterviewModel[] = [];

  constructor(
    private router: Router,
    public dialog: MatDialog,
  ) {
    this.routerUrl = router.url;
  }


  ngOnInit(): void {
    if (localStorage.getItem('interviewList')) {
      this.interviewList = JSON.parse(localStorage.getItem('interviewList'));
    }
  }

  navigateToUrl(state, id) {
    this.router.navigate([state, id]);
  }


  importDocument() {
    const dialogRef = this.dialog.open(ImportDocumentDialogComponent, { width: '1000px' });

    dialogRef.afterClosed().subscribe((data: { interviewQuestionName: string, interviewQuestionData: QuestionnaireModel[] }) => {
      if (!data.interviewQuestionName || !data.interviewQuestionData) { return; }

      const id = uuidv4();
      this.interviewList.push({ id, name: data.interviewQuestionName, data: data.interviewQuestionData });
      localStorage.setItem('interviewList', JSON.stringify(this.interviewList));

      this.router.navigate(['interview', id]);
    });
  }

}
