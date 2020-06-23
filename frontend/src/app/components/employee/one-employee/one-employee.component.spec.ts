import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { OneEmployeeComponent } from './one-employee.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('OneEmployeeComponent', () => {
  let component: OneEmployeeComponent;
  let fixture: ComponentFixture<OneEmployeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OneEmployeeComponent ],
      imports:[HttpClientTestingModule, RouterTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OneEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have name'), () => {
    const fixture = TestBed.createComponent(OneEmployeeComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    const name = compiled.querySelector('h1').textContent;
    expect(name).toContain('Працівник');
  };

  it('should have customer service'), () =>{
    const fixture = TestBed.createComponent(OneEmployeeComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    const name = compiled.querySelector('h3').textContent;
    expect(name).toContain('Історія обслуговування');
  };

});
