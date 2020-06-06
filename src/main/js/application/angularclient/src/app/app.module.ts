import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProfileEditorComponent } from './profile-editor/profile-editor.component';
import { RefinanceComponent } from './refinance/refinance.component';
import { LoanPurposeComponent } from './loan-purpose/loan-purpose.component';
import { StatePickerComponent } from './state-picker/state-picker.component';

@NgModule({
  declarations: [
    AppComponent,
    ProfileEditorComponent,
    RefinanceComponent,
    LoanPurposeComponent,
    StatePickerComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
