import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-refinance',
  templateUrl: './refinance.component.html',
  styleUrls: ['./refinance.component.sass']
})
export class RefinanceComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  step: string = ""; 

  refinanceForm = new FormGroup({
    streetAddress: new FormControl(''),
    city: new FormControl(''),
    state: new FormControl(''),
    zipcode: new FormControl('')
  });

  onSubmit(step: string) {
    this.step = step;

    if(!this.refinanceForm.valid) {
      return false;
    } else {
      alert(JSON.stringify(this.refinanceForm.value))
    }
  }

  action(event:string) {
    alert(event);
  }

}
