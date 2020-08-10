import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReportProgressbarComponent } from './report-progressbar.component';

describe('RadarChartComponent', () => {
  let component: ReportProgressbarComponent;
  let fixture: ComponentFixture<ReportProgressbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportProgressbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportProgressbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
