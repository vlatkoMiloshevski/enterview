import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ImportDocumentDialogComponent } from './import-document-dialog.component';


describe('ImportDocumentDialogComponent', () => {
  let component: ImportDocumentDialogComponent;
  let fixture: ComponentFixture<ImportDocumentDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ImportDocumentDialogComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportDocumentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
