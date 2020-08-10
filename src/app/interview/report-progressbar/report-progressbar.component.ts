import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-report-progressbar',
  templateUrl: './report-progressbar.component.html',
  styleUrls: ['./report-progressbar.component.scss']
})
export class ReportProgressbarComponent implements OnInit, OnChanges {
  public chartType = 'radar';
  @Input() progressBarReportModelList: Array<number[]>;
  @Input() sectionNameList: string[];

  constructor() { }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {
    this.progressBarReportModelList = changes.progressBarReportModelList.currentValue;
  }

}
