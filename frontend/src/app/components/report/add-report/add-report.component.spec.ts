import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AddReportComponent } from './add-report.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { computeDecimalDigest } from '@angular/compiler/src/i18n/digest';

describe('AddReportComponent', () => {
  let component: AddReportComponent;
  let fixture: ComponentFixture<AddReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddReportComponent ],
      imports: [HttpClientTestingModule, RouterTestingModule, FormsModule, ReactiveFormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should has submit and cancel buttons'), () => {
    const fixture = TestBed.createComponent(AddReportComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    const submitBtn = compiled.querySelector('#submitBtn');
    const cancelBtn = compiled.querySelector('#cancelBtn');
    const result = submitBtn && cancelBtn;
    expect(result).toBeTruthy();
  }
});
