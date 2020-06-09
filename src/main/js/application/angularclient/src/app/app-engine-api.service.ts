import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppEngineApiService {

  constructor(private http: HttpClient) { }

  baseUrl: string = 'http://localhost:8080/api/appengine/v1/loan/'
  loanUrl: string = this.baseUrl;
  stateUrl: string = this.baseUrl + 'state/';
  refinanceLoanUrl: string = this.baseUrl + 'refinance';
  coBorrowerLoanUrl: string = this.baseUrl + 'co-borrower';
  completedLoanUrl: string = this.baseUrl + 'completed';

  public getAppEngineState(loanId: string) {
    return this.http.get<AppEngineState>(this.stateUrl + loanId);
  }

  public getAppEngineLoan(loanId: string) {
    return this.http.get<AppEngineState>(this.loanUrl + loanId);
  }

  public postNewLoan(loanApp: LoanApp) {
    return this.http.post<LoanApp>(this.loanUrl, loanApp);
  }

  public postRefinanceLoan(loanApp: LoanApp) {
    return this.http.post<LoanApp>(this.refinanceLoanUrl, loanApp);
  }

  public postCoBorrowerLoan(loanApp: LoanApp) {
    return this.http.post<LoanApp>(this.coBorrowerLoanUrl, loanApp);
  }

  public postCompletedLoan(loanApp: LoanApp) {
    return this.http.post<LoanApp>(this.completedLoanUrl, loanApp);
  }
}

export enum LoanState {
  DEFAULT = "DEFAULT",
  REFINANCE = "REFINANCE",
  CO_BORROWER = "CO_BORROWER",
  LOAN_SUBMIT = "LOAN_SUBMIT",
  COMPLETED = "COMPLETED"
}

export enum LoanPurpose {
  PURCHASE,
  REFINANCE
}

export interface AppEngineState {
  nextLoanState: LoanState;
}

export class CoBorrower {
  fullName: string;
  age: number;

  constructor(fullName: string, age: number) {
    this.fullName = fullName;
    this.age = age;
  }
}

export class LoanApp {
  loanId: string = "";
  fullName: string = "";
  age: number = 0;
  loanPurpose: LoanPurpose;
  nextLoanState: LoanState = LoanState.DEFAULT;
  streetAddress: string = "";
  city: string = "";
  state: string = "";
  zipCode: number = 0;
  coBorrower: CoBorrower;
}
