import { Component, OnInit, ViewChild, ChangeDetectorRef, AfterViewInit, Input, OnChanges, SimpleChanges, ElementRef, Output, EventEmitter } from '@angular/core';
import { MatInput } from '@angular/material/input';
import { interval } from 'rxjs';
import { first } from 'rxjs/operators';
import { DataStats } from 'src/app/shared/models/questionnarie.model';
import { scrollToService } from 'src/app/shared/helpers/scroll-to.service';
import { SCROLL_CONSTANTS } from 'src/app/shared/helpers/scroll-to.constants';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-feedback-template',
  templateUrl: './feedback-template.component.html',
  styleUrls: ['./feedback-template.component.scss']
})
export class FeedbackTemplateComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() candidateName: string;
  @Input() dataStats: DataStats;
  @Input() progressBarReportModelList: Array<number[]>;
  @Input() sectionNameList: string[];
  @Output() downloadEmit: EventEmitter<void> = new EventEmitter<void>();

  @ViewChild('screen') screen: ElementRef;
  @ViewChild('canvas') canvas: ElementRef;
  @ViewChild('downloadLink') downloadLink: ElementRef;

  @ViewChild('txtValFirst') txtValFirst: MatInput;
  @ViewChild('txtValSecond') txtValSecond: MatInput;
  @ViewChild('txtValThird') txtValThird: MatInput;

  firstQuestionVisible = true;
  secondQuestionVisible = false;
  thirdQuestionVisible = false;

  firstAnswerVisible = false;
  secondAnswerVisible = false;
  thirdAnswerVisible = false;

  firstTextareaVisible = true;
  secondTextareaVisible = false;
  thirdTextareaVisible = false;

  firstAnswerMessage: string;
  secondAnswerMessage: string;
  thirdAnswerMessage: string;

  progressBarValue: number;

  constructor(
    private cd: ChangeDetectorRef,
  ) {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.dataStats && changes.dataStats.currentValue) {
      this.dataStats = changes.dataStats.currentValue;
      this.progressBarValue = Math.round(this.dataStats.completedQuestions / this.dataStats.totalQuestions * 100);

      if (changes.candidateName && changes.candidateName.currentValue !== changes.candidateName.previousValue) {
        this.firstQuestionVisible = true;
        this.secondQuestionVisible = false;
        this.thirdQuestionVisible = false;

        this.firstAnswerVisible = false;
        this.secondAnswerVisible = false;
        this.thirdAnswerVisible = false;

        this.firstTextareaVisible = true;
        this.secondTextareaVisible = false;
        this.thirdTextareaVisible = false;

        if (this.txtValFirst) { this.txtValFirst.value = null; }
        if (this.txtValSecond) { this.txtValSecond.value = null; }
        if (this.txtValThird) { this.txtValThird.value = null; }
      }
    }
  }

  ngAfterViewInit() {
    interval(1000).pipe(first()).subscribe(() => {
      this.cd.detectChanges();
    });
  }

  postFirstMessage(firstAnswerMessage) {
    this.firstAnswerMessage = firstAnswerMessage;
    this.firstTextareaVisible = false;
    this.firstAnswerVisible = true;
    this.secondQuestionVisible = true;
    this.secondTextareaVisible = true;

    interval(1000).pipe(first()).subscribe(() => {
      scrollToService(SCROLL_CONSTANTS.FIRST_FEEDBACK_QUESTION_SCROLL);
      interval(500).pipe(first()).subscribe(() => {
        this.txtValSecond.focus();
      });
    });
  }

  postSecondMessage(secondAnswerMessage) {
    this.secondAnswerMessage = secondAnswerMessage;
    this.secondTextareaVisible = false;
    this.secondAnswerVisible = true;
    this.thirdQuestionVisible = true;
    this.thirdTextareaVisible = true;

    interval(1000).pipe(first()).subscribe(() => {
      interval(500).pipe(first()).subscribe(() => {
        scrollToService(SCROLL_CONSTANTS.SECOND_FEEDBACK_QUESTION_SCROLL);
        this.txtValThird.focus();
      });
    });
  }

  postThirdMessage(thirdAnswerMessage) {
    this.thirdAnswerMessage = thirdAnswerMessage;
    this.thirdTextareaVisible = false;
    this.thirdAnswerVisible = true;

    interval(1000).pipe(first()).subscribe(() => {
      interval(500).pipe(first()).subscribe(() => {
        scrollToService(SCROLL_CONSTANTS.THIRD_FEEDBACK_QUESTION_SCROLL);
      });
    });
  }

  editFirstAnswer() {
    this.firstTextareaVisible = true;
    this.secondTextareaVisible = false;
    this.thirdTextareaVisible = false;

    interval(1000).pipe(first()).subscribe(() => {
      interval(500).pipe(first()).subscribe(() => {
        scrollToService(SCROLL_CONSTANTS.FIRST_FEEDBACK_QUESTION_SCROLL);
        this.txtValFirst.focus();
      });
    });
  }

  editSecondAnswer() {
    this.firstTextareaVisible = false;
    this.secondTextareaVisible = true;
    this.thirdTextareaVisible = false;

    interval(1000).pipe(first()).subscribe(() => {
      interval(500).pipe(first()).subscribe(() => {
        scrollToService(SCROLL_CONSTANTS.SECOND_FEEDBACK_QUESTION_SCROLL);
        this.txtValSecond.focus();
      });
    });
  }

  editThirdAnswer() {
    this.firstTextareaVisible = false;
    this.secondTextareaVisible = false;
    this.thirdTextareaVisible = true;

    interval(1000).pipe(first()).subscribe(() => {
      interval(500).pipe(first()).subscribe(() => {
        scrollToService(SCROLL_CONSTANTS.THIRD_FEEDBACK_QUESTION_SCROLL);
        this.txtValThird.focus();
      });
    });
  }

  downloadImage() {
    html2canvas(this.screen.nativeElement).then(canvas => {
      this.canvas.nativeElement.src = canvas.toDataURL();
      this.downloadLink.nativeElement.href = canvas.toDataURL('image/png');
      this.downloadLink.nativeElement.download = `${this.candidateName}_feedback.png`;
      this.downloadLink.nativeElement.click();
    });

    this.downloadEmit.emit();
  }

}
