import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { QuestionnaireModel } from '../../models/questionnarie.model';

@Component({
  selector: 'app-delete-document-dialog',
  templateUrl: './delete-document-dialog.component.html',
  styleUrls: ['./delete-document-dialog.component.scss']
})
export class DeleteDocumentDialogComponent implements OnInit {
  fileToUpload: File = null;
  form: FormGroup;
  editorData: QuestionnaireModel[];

  constructor(
    public dialogRef: MatDialogRef<DeleteDocumentDialogComponent>,
  ) {

  }

  ngOnInit(): void {

  }

  onCancel(): void {
    this.dialogRef.close({ isDeleted: false });
  }

  onDone(): void {
    this.dialogRef.close({ isDeleted: true });
  }

}
