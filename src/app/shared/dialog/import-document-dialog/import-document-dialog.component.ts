import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { JsonEditorComponent, JsonEditorOptions } from 'ang-jsoneditor';
import { QuestionnaireModel } from '../../models/questionnarie.model';

@Component({
  selector: 'app-import-document-dialog',
  templateUrl: './import-document-dialog.component.html',
  styleUrls: ['./import-document-dialog.component.scss']
})
export class ImportDocumentDialogComponent implements OnInit {
  @ViewChild(JsonEditorComponent, { static: false }) editor: JsonEditorComponent;
  fileToUpload: File = null;
  form: FormGroup;
  editorOptions: JsonEditorOptions;
  editorData: QuestionnaireModel[];
  showErrorMessage: boolean;

  constructor(
    public dialogRef: MatDialogRef<ImportDocumentDialogComponent>,
    private fb: FormBuilder,
  ) {
    this.editorData = [
      {
        sectionName: 'HTML', questionList: [
          'question 1 HTML',
          'question 2 HTML',
        ],
      },
      {
        sectionName: 'CSS', questionList: [
          'question 1 CSS',
          'question 2 CSS',
        ],
      },
    ];
    this.editorOptions = new JsonEditorOptions();
    this.editorOptions.modes = ['code', 'text', 'tree', 'view'];
    this.editorOptions.mode = 'code';
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      interviewQuestionName: 'Front End Interview',
      interviewQuestionData: [this.editorData]
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onDone(): void {
    if (!this.isInstanceOfQuestionnaireModel(this.form.value.interviewQuestionData)) {
      this.showErrorMessage = true;
      return;
    }

    this.showErrorMessage = false;
    this.dialogRef.close(this.form.value);
  }

  private isInstanceOfQuestionnaireModel(questionnaireModelList: QuestionnaireModel[]): questionnaireModelList is QuestionnaireModel[] {
    return questionnaireModelList.every(questionnaireModel =>
      questionnaireModel.hasOwnProperty('sectionName')
      && typeof questionnaireModel.sectionName === 'string'
      && questionnaireModel.hasOwnProperty('questionList')
      && questionnaireModel.questionList
      && questionnaireModel.questionList.length
      && questionnaireModel.questionList.every(question => typeof question === 'string')
      && Object.keys(questionnaireModel).length === 2
    );
  }
}
