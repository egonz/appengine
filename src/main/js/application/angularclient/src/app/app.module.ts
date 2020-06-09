import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProfileEditorComponent } from './profile-editor/profile-editor.component';
import { RefinanceComponent } from './refinance/refinance.component';
import { LoanPurposeComponent } from './loan-purpose/loan-purpose.component';
import { CookieService } from 'ngx-cookie-service';
import { CoBorrowerComponent } from './co-borrower/co-borrower.component';
import { LoanSubmitComponent } from './loan-submit/loan-submit.component';

@NgModule({
  declarations: [
    AppComponent,
    ProfileEditorComponent,
    RefinanceComponent,
    LoanPurposeComponent,
    CoBorrowerComponent,
    LoanSubmitComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
