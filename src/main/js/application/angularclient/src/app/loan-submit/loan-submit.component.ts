import { Component, OnInit } from '@angular/core';
import {AppEngineApiService, LoanApp, LoanPurpose} from '../app-engine-api.service';
import {AppEngineLoanCookieService, LoanCookie} from '../app-engine-loan-cookie.service';

@Component({
  selector: 'app-loan-submit',
  templateUrl: './loan-submit.component.html',
  styleUrls: ['./loan-submit.component.sass']
})
export class LoanSubmitComponent implements OnInit {

  constructor(private apiService: AppEngineApiService, 
    private loanCookieService: AppEngineLoanCookieService) { }

  loanApp: LoanApp;

  ngOnInit(): void {
    let loanCookie = this.loanCookieService.getLoanCookie();

    this.apiService.getAppEngineLoan(loanCookie.loanId)
      .subscribe((data: LoanApp) => {
        this.loanApp = data;
    });

    this.loanCookieService.deleteLoanCookie();
  }

}
