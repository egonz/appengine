import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RefinanceComponent } from './refinance/refinance.component';
import { LoanPurposeComponent } from './loan-purpose/loan-purpose.component';

const routes: Routes = [
  { path: 'refinance', component: RefinanceComponent },
  { path: 'loan-purpose', component: LoanPurposeComponent }
];

// ,
//   { path: '', redirectTo: '/loan-purpose', pathMatch: 'full' }

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
