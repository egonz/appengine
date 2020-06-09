import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanSubmitComponent } from './loan-submit.component';

describe('LoanSubmitComponent', () => {
  let component: LoanSubmitComponent;
  let fixture: ComponentFixture<LoanSubmitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoanSubmitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanSubmitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
