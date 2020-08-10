import { Component, EventEmitter, Input, OnInit, Output, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { MatAccordion } from '@angular/material/expansion';
import { QuestionnarieAnswerModel, QuestionnaireModel } from '../../shared/models/questionnarie.model';

@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.scss']
})
export class QuestionnaireComponent implements OnInit, OnChanges {
  @ViewChild('accordion') accordion: MatAccordion;
  @Input() levels: string[];
  @Input() sectionName: string;
  @Input() isEnabled: string;
  @Input() questions: string[];
  @Input() answers: string[];
  @Output() answerEmit: EventEmitter<QuestionnarieAnswerModel> = new EventEmitter<QuestionnarieAnswerModel>();
  @Output() accordionEmit: EventEmitter<any> = new EventEmitter<MatAccordion>();

  form: FormGroup;
  completed: any;
  questionnarieAnswerModel: QuestionnarieAnswerModel;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      questionnarie: new FormArray([]),
    });

    setTimeout(() => {
      this.accordionEmit.emit({
        accordion: this.accordion,
        sectionName: this.sectionName,
      });
    });

    this.form.valueChanges.subscribe((value) => {
      setTimeout(() => {
        this.questionnarieAnswerModel = ({
          answerlist: value.questionnarie,
          sectionName: this.sectionName,
        });
        this.answerEmit.emit(this.questionnarieAnswerModel);
      });
    });

    this.questions.forEach(question => {
      this.formQuestionnarie.push(this.formBuilder.group({
        answer: ['', Validators.required],
        question,
      }));
    });
  }

  ngOnChanges(simpleChanges: SimpleChanges) {
    if (simpleChanges.answers && simpleChanges.answers.currentValue) {
      (this.form.controls.questionnarie as FormArray).controls
        .forEach((control: AbstractControl, index) => control.get('answer').setValue(simpleChanges.answers.currentValue[index]));
    }
  }

  get formQuestionnarie() {
    return this.form.controls.questionnarie as FormArray;
  }

  get isCompleted() {
    return (this.form.controls.questionnarie as FormArray)
      .controls.every((control: AbstractControl) => control.get('answer').value !== '');
  }

}
