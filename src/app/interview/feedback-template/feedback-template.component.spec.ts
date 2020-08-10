import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackTemplateComponent } from './feedback-template.component';

describe('FeedbackTemplateComponent', () => {
  let component: FeedbackTemplateComponent;
  let fixture: ComponentFixture<FeedbackTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedbackTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbackTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
