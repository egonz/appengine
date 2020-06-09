import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AppEngineLoanCookieService {

  constructor(private cookieService: CookieService) { }

  private loanCookieName = "app-engine-loan";

  public getLoanCookie() {
    let loanCookie = new LoanCookie("");
    loanCookie.loanId = this.cookieService.get(this.loanCookieName);
    return loanCookie;
  }

  public setLoanCookie(loanCookie: LoanCookie) {
    this.cookieService.set(this.loanCookieName, loanCookie.loanId);
  }

  public deleteLoanCookie() {
    this.cookieService.delete(this.loanCookieName);
  }
}

export class LoanCookie {
  loanId: string = "";

  constructor(loanId: string) {
    this.loanId = loanId;
    console.log("loanid to save as a cookie " + this.loanId);
   }
}
