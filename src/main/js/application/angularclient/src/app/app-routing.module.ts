import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RefinanceComponent } from './refinance/refinance.component';
import { LoanPurposeComponent } from './loan-purpose/loan-purpose.component';
import { CoBorrowerComponent } from './co-borrower/co-borrower.component';
import { LoanSubmitComponent } from './loan-submit/loan-submit.component';

const routes: Routes = [
  { path: 'refinance', component: RefinanceComponent },
  { path: 'loan_purpose', component: LoanPurposeComponent },
  { path: 'co_borrower', component: CoBorrowerComponent },
  { path: 'loan_submit', component: LoanSubmitComponent },
  { path: 'completed', component: LoanSubmitComponent }
];

// ,
//   { path: '', redirectTo: '/loan-purpose', pathMatch: 'full' }

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
