import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { LEVEL_CONSTANT_LIST, level_enum } from 'src/app/shared/models/questionnarie.model';
import {
  BAR_BORDER_COLOR_RED,
  BAR_BORDER_COLOR_YELLOW,
  BAR_BORDER_COLOR_ORANGE,
  BAR_BORDER_COLOR_BLUE,
  BAR_BORDER_COLOR_GREEN,
} from 'src/app/shared/models/chart.model';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit, OnChanges {
  @Input() pieChartModel: number[];
  public chartType = 'doughnut';

  public chartDatasets: Array<any>;

  public chartLabels: Array<any> = [
    LEVEL_CONSTANT_LIST[level_enum.None],
    LEVEL_CONSTANT_LIST[level_enum.AwareOfIt],
    LEVEL_CONSTANT_LIST[level_enum.WorkedAroundIt],
    LEVEL_CONSTANT_LIST[level_enum.DoneIt],
    LEVEL_CONSTANT_LIST[level_enum.CanTeachIt],
    'Skipped',
  ];

  public chartColors: Array<any> = [
    {
      backgroundColor: [
        BAR_BORDER_COLOR_RED, BAR_BORDER_COLOR_ORANGE, BAR_BORDER_COLOR_YELLOW, BAR_BORDER_COLOR_BLUE, BAR_BORDER_COLOR_GREEN,
      ],
      hoverBackgroundColor: [
        BAR_BORDER_COLOR_RED, BAR_BORDER_COLOR_ORANGE, BAR_BORDER_COLOR_YELLOW, BAR_BORDER_COLOR_BLUE, BAR_BORDER_COLOR_GREEN,
      ],
      borderWidth: 1,
    }
  ];

  public chartOptions: any = {
    responsive: true
  };

  constructor() { }

  ngOnInit(): void {
    this.chartDatasets = [{ data: this.pieChartModel, label: '' }];
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.pieChartModel = changes.pieChartModel.currentValue;
    this.chartDatasets = [{ data: this.pieChartModel, label: '' }];
  }

}
