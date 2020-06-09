import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, ValidationErrors } from '@angular/forms';
import {AppEngineApiService, CoBorrower, LoanApp} from '../app-engine-api.service';
import {Router} from '@angular/router';
import {AppEngineLoanCookieService, LoanCookie} from '../app-engine-loan-cookie.service';

@Component({
  selector: 'app-co-borrower',
  templateUrl: './co-borrower.component.html',
  styleUrls: ['./co-borrower.component.sass']
})
export class CoBorrowerComponent implements OnInit {

  hasCoBorrower: boolean = false;

  constructor(private apiService:AppEngineApiService, private router: Router,
    private loanCookieService: AppEngineLoanCookieService) { }

  ngOnInit(): void {
  }

  coBorrowerForm = new FormGroup({
    fullName: new FormControl(''),
    age: new FormControl('')
  });

  changeCoBorrower(e) {
    if (e.target.value === 'yes') {
      this.hasCoBorrower = true;
    } else {
      let loanCookie = this.loanCookieService.getLoanCookie();
      let loanApp = new LoanApp();
      loanApp.loanId = loanCookie.loanId;
      this.apiService.postCompletedLoan(loanApp)
      .subscribe((data: LoanApp) => {
        let loanApp = data;
        console.log(loanApp);
        this.router.navigate([loanApp.nextLoanState.toLowerCase()]);
      });
      // this.router.navigate(['loan_submit']);
    }
  }

  onSubmit() {
    if(!this.coBorrowerForm.valid) {
      return false;
    } else {
      let loanCookie = this.loanCookieService.getLoanCookie();
      let coBorrowerName = this.coBorrowerForm.get('fullName').value;
      let coBorrowerAge = this.coBorrowerForm.get('age').value;

      let loanApp = new LoanApp();
      loanApp.loanId = loanCookie.loanId;
      loanApp.coBorrower = new CoBorrower(coBorrowerName, coBorrowerAge);
      
      this.apiService.postCoBorrowerLoan(loanApp)
      .subscribe((data: LoanApp) => {
        let loanApp = data;
        console.log(loanApp);
        this.router.navigate([loanApp.nextLoanState.toLowerCase()]);
      });
    }
  }

}
