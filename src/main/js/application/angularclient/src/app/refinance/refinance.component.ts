import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, ValidationErrors } from '@angular/forms';
import {AppEngineApiService, AppEngineState, LoanApp} from '../app-engine-api.service';
import {Router} from '@angular/router';
import {AppEngineLoanCookieService, LoanCookie} from '../app-engine-loan-cookie.service';

export class DropdownValue {
  value:string;
  label:string;

  constructor(value:string,label:string) {
    this.value = value;
    this.label = label;
  }
}

@Component({
  selector: 'app-refinance',
  templateUrl: './refinance.component.html',
  styleUrls: ['./refinance.component.sass']
})
export class RefinanceComponent implements OnInit {

  stateValues: DropdownValue[] = [
    new DropdownValue('AK','Alaska'),
    new DropdownValue('AL','Alabama'),
    new DropdownValue('AR','Arkansas'),
    new DropdownValue('AZ','Arizona'),
    new DropdownValue('CA','California'),
    new DropdownValue('CO','Colorado'),
    new DropdownValue('CT','Connecticut'),
    new DropdownValue('DC','District of Columbia'),
    new DropdownValue('DE','Delaware'),
    new DropdownValue('FL','Florida'),
    new DropdownValue('GA','Georgia'),
    new DropdownValue('HI','Hawaii'),
    new DropdownValue('IA','Iowa'),
    new DropdownValue('ID','Idaho'),
    new DropdownValue('IL','Illinois'),
    new DropdownValue('IN','Indiana'),
    new DropdownValue('KS','Kansas'),
    new DropdownValue('KY','Kentucky'),
    new DropdownValue('LA','Louisiana'),
    new DropdownValue('MA','Massachusetts'),
    new DropdownValue('MD','Maryland'),
    new DropdownValue('ME','Maine'),
    new DropdownValue('MI','Michigan'),
    new DropdownValue('MN','Minnesota'),
    new DropdownValue('MO','Missouri'),
    new DropdownValue('MS','Mississippi'),
    new DropdownValue('MT','Montana'),
    new DropdownValue('NC','North Carolina'),
    new DropdownValue('ND','North Dakota'),
    new DropdownValue('NE','Nebraska'),
    new DropdownValue('NH','New Hampshire'),
    new DropdownValue('NJ','New Jersey'),
    new DropdownValue('NM','New Mexico'),
    new DropdownValue('NV','Nevada'),
    new DropdownValue('NY','New York'),
    new DropdownValue('OH','Ohio'),
    new DropdownValue('OK','Oklahoma'),
    new DropdownValue('OR','Oregon'),
    new DropdownValue('PA','Pennsylvania'),
    new DropdownValue('PR','Puerto Rico'),
    new DropdownValue('RI','Rhode Island'),
    new DropdownValue('SC','South Carolina'),
    new DropdownValue('SD','South Dakota'),
    new DropdownValue('TN','Tennessee'),
    new DropdownValue('TX','Texas'),
    new DropdownValue('UT','Utah'),
    new DropdownValue('VA','Virginia'),
    new DropdownValue('VT','Vermont'),
    new DropdownValue('WA','Washington'),
    new DropdownValue('WI','Wisconsin'),
    new DropdownValue('WV','West Virginia'),
    new DropdownValue('WY','Wyoming')
  ];

  constructor(private apiService:AppEngineApiService, private router: Router,
    private loanCookieService: AppEngineLoanCookieService) { }

  ngOnInit(): void {
  }

  static zipCodeValidator: ValidatorFn = (zc): ValidationErrors => {
    if ( + zc.value < 0 ) {
      return { invalid: true }
    } else {
      null;
    }
  }

  refinanceForm = new FormGroup({
    streetAddress: new FormControl(''),
    city: new FormControl(''),
    state: new FormControl(''),
    zipcode: new FormControl('', Validators.compose([
      Validators.required,
      RefinanceComponent.zipCodeValidator
    ]))
  });

  onSubmit() {
    if(!this.refinanceForm.valid) {
      return false;
    } else {
      let loanCookie = this.loanCookieService.getLoanCookie();

      let loanApp = new LoanApp();
      loanApp.loanId = loanCookie.loanId;
      loanApp.streetAddress = this.refinanceForm.get('streetAddress').value;
      loanApp.city = this.refinanceForm.get('city').value;
      loanApp.state = this.refinanceForm.get('state').value;
      loanApp.zipCode = this.refinanceForm.get('zipcode').value;

      this.apiService.postRefinanceLoan(loanApp)
      .subscribe((data: LoanApp) => {
        let loanApp = data;
        console.log(loanApp);
        this.router.navigate([loanApp.nextLoanState.toLowerCase()]);
      });
    }
  }

  selectItem(value) {
    console.log('value: ' + value);
  }

}
