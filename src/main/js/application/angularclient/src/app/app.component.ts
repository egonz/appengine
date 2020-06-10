import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {AppEngineApiService, AppEngineState, LoanState} from './app-engine-api.service';
import {AppEngineLoanCookieService, LoanCookie} from './app-engine-loan-cookie.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'App Engine Loan POC';
  
  loanCookie: LoanCookie = null;

  appEngineState: AppEngineState;

  constructor(private router: Router, private apiService: AppEngineApiService, 
    private loanCookieService: AppEngineLoanCookieService) {
  }

  public ngOnInit(): void {
    this.loadLoan();
  }

  public loadLoan(): void {
    this.loanCookie = this.loanCookieService.getLoanCookie();

    if (this.loanCookie !== null && this.loanCookie.loanId.length > 0) {
      console.log("loanId: " + this.loanCookie.loanId);
      this.apiService.getAppEngineState(this.loanCookie.loanId)
      .subscribe((data: AppEngineState) => {
        this.appEngineState = data;
        this.router.navigate([this.appEngineState.nextLoanState.toLowerCase()]);
      }, (error: string) => {
        this.loanCookieService.deleteLoanCookie();
        this.router.navigate(['loan_purpose']);
      });
    } else {
      console.log("loanId is null");
      this.router.navigate(['loan_purpose']);
    }
  }
}
