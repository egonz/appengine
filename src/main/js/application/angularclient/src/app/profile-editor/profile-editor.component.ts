import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, ValidationErrors } from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-profile-editor',
  templateUrl: './profile-editor.component.html',
  styleUrls: ['./profile-editor.component.sass']
})
export class ProfileEditorComponent implements OnInit {

  step: string = "";

  constructor(private router: Router) { }

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

  onSubmit(step: string) {
    this.step = step;

    if(!this.profileForm.valid) {
      return false;
    } else {
      this.router.navigate(['refinance']);
    }
  }

}
