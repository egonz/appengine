import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, ValidationErrors } from '@angular/forms';
import {Router} from '@angular/router';
import {AppEngineApiService, AppEngineState, LoanApp} from '../app-engine-api.service';
import {AppEngineLoanCookieService, LoanCookie} from '../app-engine-loan-cookie.service';

@Component({
  selector: 'app-profile-editor',
  templateUrl: './profile-editor.component.html',
  styleUrls: ['./profile-editor.component.sass']
})
export class ProfileEditorComponent implements OnInit {

  loanApp : LoanApp;
  appEngineState: AppEngineState;

  constructor(private router: Router, private apiService: AppEngineApiService,
    private cookieService: AppEngineLoanCookieService) { }

  ngOnInit(): void {
  }

  static ageValidator: ValidatorFn = (ac): ValidationErrors => {
    if ( + ac.value > 120 ) {
      return { tooOld: true }
    } else if ( + ac.value < 1 ) {
      return { tooYoung: true }
    } else {
      null;
    }
  }

  profileForm = new FormGroup({
    fullName: new FormControl(''),
    age: new FormControl("", Validators.compose([
      Validators.required,
      ProfileEditorComponent.ageValidator
    ])),
    loanPurpose: new FormControl()
  });

  onSubmit() {
    if(!this.profileForm.valid) {
      return false;
    } else {
      let loanApp = new LoanApp();
      loanApp.fullName = this.profileForm.get('fullName').value;
      loanApp.age = this.profileForm.get('age').value;
      loanApp.loanPurpose = this.profileForm.get('loanPurpose').value.toUpperCase();

      this.apiService.postNewLoan(loanApp)
      .subscribe((data: LoanApp) => {
        this.loanApp = data;
        console.log(this.loanApp);

        this.cookieService.setLoanCookie(new LoanCookie(this.loanApp.loanId));
        this.router.navigate([this.loanApp.nextLoanState.toLowerCase()]);
      });
    }
  }

}
