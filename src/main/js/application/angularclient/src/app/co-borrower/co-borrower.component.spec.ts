import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoBorrowerComponent } from './co-borrower.component';

describe('CoBorrowerComponent', () => {
  let component: CoBorrowerComponent;
  let fixture: ComponentFixture<CoBorrowerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoBorrowerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoBorrowerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
