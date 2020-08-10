import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CandidateModel } from 'src/app/shared/models/questionnarie.model';
import { DeleteDocumentDialogComponent } from 'src/app/shared/dialog/delete-document-dialog/delete-document-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-candidate-list',
  templateUrl: './candidate-list.component.html',
  styleUrls: ['./candidate-list.component.scss']
})
export class CandidateListComponent implements OnInit {
  @Input() interviewId;
  @Input() candidate: CandidateModel;
  @Output() questionAnswerListEmitter: EventEmitter<CandidateModel> = new EventEmitter<CandidateModel>();
  @Output() deleteCandidateEmitter: EventEmitter<CandidateModel> = new EventEmitter<CandidateModel>();

  constructor(
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {

  }

  clickOnCandidateName(selectedCandidate: CandidateModel) {
    this.questionAnswerListEmitter.emit(selectedCandidate);
  }

  deleteCandidate(selectedCandidate) {
    const dialogRef = this.dialog.open(DeleteDocumentDialogComponent, { width: '400px' });

    dialogRef.afterClosed().subscribe((data: { isDeleted: boolean }) => {
      if (!data.isDeleted) { return; }


      this.deleteCandidateEmitter.emit(selectedCandidate);
    });
  }

}
