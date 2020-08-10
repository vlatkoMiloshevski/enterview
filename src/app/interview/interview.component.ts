import { Component, OnInit, ViewChild } from '@angular/core';
import { LEVEL_CONSTANT_LIST, QuestionnarieAnswerModel, AnswerModel, DataStats, QuestionnaireModel } from '../shared/models/questionnarie.model';
import { scrollToService } from '../shared/helpers/scroll-to.service';
import { MatInput } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { interval } from 'rxjs';
import { first } from 'rxjs/operators';
import { QuestionnaireComponent } from './questionnaire/questionnaire.component';
import { SCROLL_CONSTANTS } from '../shared/helpers/scroll-to.constants';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDocumentDialogComponent } from '../shared/dialog/delete-document-dialog/delete-document-dialog.component';
import { CandidateModel, QuestionAnswerModel } from 'src/app/shared/models/questionnarie.model';

@Component({
  selector: 'app-interview',
  templateUrl: './interview.component.html',
  styleUrls: ['./interview.component.scss']
})
export class InterviewComponent implements OnInit {
  @ViewChild('questionnaireComponent') questionnaireComponent: QuestionnaireComponent;
  @ViewChild('candidateInput') candidateInput: MatInput;

  interviewModel: QuestionnaireModel[];
  levels: string[] = LEVEL_CONSTANT_LIST;
  submitted: boolean;
  barChartModelList: Array<number[]> = [];
  questionAnswerList: AnswerModel[] = [];
  sectionNameList: string[];
  isGenerateReportButtonVisible: boolean;
  pieChartModel: number[];
  candidateName: string;
  isFeedbackTemplateVisible: boolean;
  isReportVisible: boolean;
  dataStats: DataStats;
  interviewName: string;
  progressBarReportModelList: any;
  interviewId: any;
  candidateList: CandidateModel[] = [];

  constructor(
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private router: Router,
  ) {

  }

  ngOnInit(): void {
    this.getInterviewNameAndModelFromLocalStorage();
    this.interviewId = this.route.snapshot.params.id;
    if (localStorage.getItem('candidateList')) {
      this.candidateList = (JSON.parse(localStorage.getItem('candidateList')) as CandidateModel[])
        .filter(candidate => candidate.interviewId === this.interviewId);
    }

    interval(1000).pipe(first()).subscribe(() => {
      this.candidateInput.focus();
    });
  }

  start() {
    this.interviewModel.forEach(document => document.isEnabled = true);
    interval(200).pipe(first()).subscribe(() => {
      this.interviewModel.forEach(document => document.accordion.openAll());
      interval(100).pipe(first()).subscribe(() => {
        scrollToService(this.interviewModel[0].sectionName);
        this.isGenerateReportButtonVisible = true;
      });
    });
  }

  generateReport() {
    this.interviewModel.forEach(document => document.accordion.closeAll());
    this.isReportVisible = true;
    this.calclulateStats();

    interval(1500).pipe(first()).subscribe(() => {
      scrollToService(SCROLL_CONSTANTS.CHARTS);
    });

    this.addCandidate();
  }

  provideFeedback() {
    this.calclulateStats();

    this.isFeedbackTemplateVisible = true;
    interval(500).pipe(first()).subscribe(() => {
      scrollToService(SCROLL_CONSTANTS.FEEDBACK);
    });
  }

  onAnswer(questionnarieAnswerModel: QuestionnarieAnswerModel) {
    this.questionAnswerList[questionnarieAnswerModel.sectionName] = questionnarieAnswerModel.answerlist;
  }

  onInitEmitAccordions(data) {
    const currentIndexPanel =
      this.interviewModel.findIndex(questionarie => questionarie.sectionName === data.sectionName);

    this.interviewModel[currentIndexPanel].accordion = data.accordion;
  }

  questionAnswerListEmitter(selectedCandidate: CandidateModel) {
    this.candidateName = selectedCandidate.name;
    const questionAnswerListForSelectedCandidate: QuestionAnswerModel[] =
      JSON.parse(selectedCandidate.questionAnswerList);
    questionAnswerListForSelectedCandidate.forEach((questionAnswerModel) => {
      this.questionAnswerList[questionAnswerModel.sectionName] = questionAnswerModel.results;
      this.interviewModel.find(current => current.sectionName === questionAnswerModel.sectionName).answerList
        = questionAnswerModel.results.map(result => result.answer.toString());
    });

    // Start
    this.interviewModel.forEach(document => document.isEnabled = true);
    this.interviewModel.forEach(document => document.accordion.openAll());
    this.isGenerateReportButtonVisible = true;
    // Generate reports
    this.calclulateStats();
    // Feedback
    interval(500).pipe(first()).subscribe(() => {
      this.isReportVisible = true;
      this.isFeedbackTemplateVisible = true;
    });
  }

  deleteCandidateEmitter(selectedCandidate: CandidateModel) {
    const candidateList: CandidateModel[] = JSON.parse(localStorage.getItem('candidateList'));
    const selectedCandidateIndex =
      candidateList.findIndex(candidate => candidate.interviewId === selectedCandidate.interviewId && candidate.name === selectedCandidate.name);
    candidateList.splice(selectedCandidateIndex, 1);
    localStorage.setItem('candidateList', JSON.stringify(candidateList));
    this.candidateList = (JSON.parse(localStorage.getItem('candidateList')) as CandidateModel[])
      .filter(candidate => candidate.interviewId === this.interviewId);
  }

  deleteDocument() {
    const dialogRef = this.dialog.open(DeleteDocumentDialogComponent, { width: '400px' });

    dialogRef.afterClosed().subscribe((data: { isDeleted: boolean }) => {
      if (!data.isDeleted) { return; }

      const interviewListFromLocalStorage = localStorage.getItem('interviewList');
      if (interviewListFromLocalStorage) {
        const interviewList = JSON.parse(localStorage.getItem('interviewList'));
        if (interviewListFromLocalStorage && interviewListFromLocalStorage.length) {
          const interviewModelsFromLocalStorage = interviewList
            .filter(interviewModel => interviewModel.id !== this.route.snapshot.params.id);
          localStorage.setItem('interviewList', JSON.stringify(interviewModelsFromLocalStorage));


          this.router.navigateByUrl('/');
        }
      }
    });
  }

  private addCandidate() {
    let candidateList: CandidateModel[];
    if (!localStorage.getItem('candidateList')) {
      candidateList = [];
    } else {
      candidateList = JSON.parse(localStorage.getItem('candidateList'));
      const existingCandidate = candidateList.find(candidate => candidate.name === this.candidateName);

      if (existingCandidate) {
        candidateList.splice(candidateList.indexOf(existingCandidate), 1);
      }
    }

    const questionAnswerList: QuestionAnswerModel[] = [];
    Object.keys(this.questionAnswerList).forEach(key => {
      questionAnswerList.push({
        sectionName: key,
        results: this.questionAnswerList[key],
      });
    });

    candidateList.push({
      interviewId: this.route.snapshot.params.id,
      name: this.candidateName,
      questionAnswerList: JSON.stringify(questionAnswerList),
    });

    localStorage.setItem('candidateList', JSON.stringify(candidateList));

    this.candidateList = (JSON.parse(localStorage.getItem('candidateList')) as CandidateModel[])
      .filter(candidate => candidate.interviewId === this.interviewId);
  }

  private getInterviewNameAndModelFromLocalStorage() {
    const interviewListFromLocalStorage = localStorage.getItem('interviewList');
    if (interviewListFromLocalStorage) {
      const interviewList = JSON.parse(localStorage.getItem('interviewList'));
      if (interviewListFromLocalStorage && interviewListFromLocalStorage.length) {
        const interviewModelFromLocalStorage = interviewList
          .find(interviewModel => interviewModel.id === this.route.snapshot.params.id);
        if (interviewModelFromLocalStorage && interviewModelFromLocalStorage.data) {
          this.interviewModel = interviewModelFromLocalStorage.data;
          this.interviewName = interviewModelFromLocalStorage.name;
        }
      }
    }
  }

  private calclulateStats() {
    this.dataStats = { totalQuestions: 0, totalSections: 0, completedQuestions: 0, completedSections: 0 };
    this.barChartModelList = [];
    this.pieChartModel = [];
    this.progressBarReportModelList = [];
    this.sectionNameList = this.interviewModel.map(section => section.sectionName);

    this.barChartModelList[LEVEL_CONSTANT_LIST.length] = [];
    this.pieChartModel[LEVEL_CONSTANT_LIST.length] = 0;

    LEVEL_CONSTANT_LIST.forEach((level, index) => {
      this.pieChartModel[index] = 0;
      this.barChartModelList[index] = [];
      this.interviewModel.forEach((interviewModel, interviewModelIndex) => {
        const questionAnswerListFilteredByLevel = this.questionAnswerList[interviewModel.sectionName]
          .filter(questionAnswerModel => questionAnswerModel.answer === level);

        const questionAnswerListFilteredByNotAnswered = this.questionAnswerList[interviewModel.sectionName]
          .filter(questionAnswerModel => !questionAnswerModel.answer);

        const questionAnswerListFilteredByAnswered = this.questionAnswerList[interviewModel.sectionName]
          .filter(questionAnswerModel => questionAnswerModel.answer);


        this.barChartModelList[index].push(questionAnswerListFilteredByLevel.length);
        this.pieChartModel[index] += questionAnswerListFilteredByLevel.length;

        if (index === LEVEL_CONSTANT_LIST.length - 1) {
          this.barChartModelList[LEVEL_CONSTANT_LIST.length].push(questionAnswerListFilteredByNotAnswered.length);
          this.pieChartModel[LEVEL_CONSTANT_LIST.length] += questionAnswerListFilteredByNotAnswered.length;

          this.dataStats.totalQuestions += this.questionAnswerList[interviewModel.sectionName].length;
          this.dataStats.totalSections += 1;
          this.dataStats.completedQuestions += questionAnswerListFilteredByAnswered.length;
          this.dataStats.completedSections += this.questionAnswerList[interviewModel.sectionName]
            .every(questionAnswerModel => questionAnswerModel.answer);

          this.progressBarReportModelList[interviewModelIndex] = 0;
          this.questionAnswerList[interviewModel.sectionName].forEach(questionAnswer => {
            this.progressBarReportModelList[interviewModelIndex] +=
              (LEVEL_CONSTANT_LIST.indexOf(questionAnswer.answer) * 100 / (LEVEL_CONSTANT_LIST.length - 1));
          });
          this.progressBarReportModelList[interviewModelIndex] =
            (Math.round(this.progressBarReportModelList[interviewModelIndex] / this.questionAnswerList[interviewModel.sectionName].length) > 0)
              ? Math.round(this.progressBarReportModelList[interviewModelIndex] / this.questionAnswerList[interviewModel.sectionName].length)
              : 0;
        }
      });
    });
  }

}
