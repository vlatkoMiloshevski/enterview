import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { level_enum, LEVEL_CONSTANT_LIST } from 'src/app/shared/models/questionnarie.model';
import {
  BAR_BG_COLOR_RED,
  BAR_BORDER_COLOR_RED,
  BAR_BG_COLOR_ORANGE,
  BAR_BORDER_COLOR_ORANGE,
  BAR_BG_COLOR_YELLOW,
  BAR_BORDER_COLOR_YELLOW,
  BAR_BG_COLOR_BLUE,
  BAR_BORDER_COLOR_BLUE,
  BAR_BG_COLOR_GREEN,
  BAR_BORDER_COLOR_GREEN,
} from 'src/app/shared/models/chart.model';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss'],
})
export class BarChartComponent implements OnInit, OnChanges {
  @Input() barChartModelList: Array<number[]>;
  @Input() sectionNameList: string[];
  public chartType = 'bar';

  public chartDatasets: Array<any>;

  public chartLabels: Array<any>;


  public chartColors: Array<any> = [
    {
      backgroundColor: [
        BAR_BG_COLOR_RED, BAR_BG_COLOR_RED, BAR_BG_COLOR_RED, BAR_BG_COLOR_RED, BAR_BG_COLOR_RED
      ],
      borderColor: [
        BAR_BORDER_COLOR_RED, BAR_BORDER_COLOR_RED, BAR_BORDER_COLOR_RED, BAR_BORDER_COLOR_RED, BAR_BORDER_COLOR_RED
      ],
      borderWidth: 1,
    }, {
      backgroundColor: [
        BAR_BG_COLOR_ORANGE, BAR_BG_COLOR_ORANGE, BAR_BG_COLOR_ORANGE, BAR_BG_COLOR_ORANGE, BAR_BG_COLOR_ORANGE
      ],
      borderColor: [
        BAR_BORDER_COLOR_ORANGE, BAR_BORDER_COLOR_ORANGE, BAR_BORDER_COLOR_ORANGE, BAR_BORDER_COLOR_ORANGE, BAR_BORDER_COLOR_ORANGE
      ],
      borderWidth: 1,
    }, {
      backgroundColor: [
        BAR_BG_COLOR_YELLOW, BAR_BG_COLOR_YELLOW, BAR_BG_COLOR_YELLOW, BAR_BG_COLOR_YELLOW, BAR_BG_COLOR_YELLOW
      ],
      borderColor: [
        BAR_BORDER_COLOR_YELLOW, BAR_BORDER_COLOR_YELLOW, BAR_BORDER_COLOR_YELLOW, BAR_BORDER_COLOR_YELLOW, BAR_BORDER_COLOR_YELLOW
      ],
      borderWidth: 1,
    }, {
      backgroundColor: [
        BAR_BG_COLOR_BLUE, BAR_BG_COLOR_BLUE, BAR_BG_COLOR_BLUE, BAR_BG_COLOR_BLUE, BAR_BG_COLOR_BLUE
      ],
      borderColor: [
        BAR_BORDER_COLOR_BLUE, BAR_BORDER_COLOR_BLUE, BAR_BORDER_COLOR_BLUE, BAR_BORDER_COLOR_BLUE, BAR_BORDER_COLOR_BLUE
      ],
      borderWidth: 1,
    }, {
      backgroundColor: [
        BAR_BG_COLOR_GREEN, BAR_BG_COLOR_GREEN, BAR_BG_COLOR_GREEN, BAR_BG_COLOR_GREEN, BAR_BG_COLOR_GREEN
      ],
      borderColor: [
        BAR_BORDER_COLOR_GREEN, BAR_BORDER_COLOR_GREEN, BAR_BORDER_COLOR_GREEN, BAR_BORDER_COLOR_GREEN, BAR_BORDER_COLOR_GREEN
      ],
      borderWidth: 1,
    },
  ];

  public chartOptions: any = {
    responsive: true,
    scales: {
      xAxes: [{
        stacked: true
      }],
      yAxes: [{
        stacked: false
      }]
    }
  };

  constructor() { }

  ngOnInit() {
    this.chartLabels = this.sectionNameList;

    this.chartDatasets = [
      { data: this.barChartModelList[level_enum.None], label: LEVEL_CONSTANT_LIST[level_enum.None] },
      { data: this.barChartModelList[level_enum.AwareOfIt], label: LEVEL_CONSTANT_LIST[level_enum.AwareOfIt] },
      { data: this.barChartModelList[level_enum.WorkedAroundIt], label: LEVEL_CONSTANT_LIST[level_enum.WorkedAroundIt] },
      { data: this.barChartModelList[level_enum.DoneIt], label: LEVEL_CONSTANT_LIST[level_enum.DoneIt] },
      { data: this.barChartModelList[level_enum.CanTeachIt], label: LEVEL_CONSTANT_LIST[level_enum.CanTeachIt] },
      { data: this.barChartModelList[LEVEL_CONSTANT_LIST.length], label: 'Skipped' },
    ];
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.barChartModelList = changes.barChartModelList.currentValue;
    this.chartDatasets = [
      { data: this.barChartModelList[level_enum.None], label: LEVEL_CONSTANT_LIST[level_enum.None] },
      { data: this.barChartModelList[level_enum.AwareOfIt], label: LEVEL_CONSTANT_LIST[level_enum.AwareOfIt] },
      { data: this.barChartModelList[level_enum.WorkedAroundIt], label: LEVEL_CONSTANT_LIST[level_enum.WorkedAroundIt] },
      { data: this.barChartModelList[level_enum.DoneIt], label: LEVEL_CONSTANT_LIST[level_enum.DoneIt] },
      { data: this.barChartModelList[level_enum.CanTeachIt], label: LEVEL_CONSTANT_LIST[level_enum.CanTeachIt] },
      { data: this.barChartModelList[LEVEL_CONSTANT_LIST.length], label: 'Skipped' },
    ];
  }

}
