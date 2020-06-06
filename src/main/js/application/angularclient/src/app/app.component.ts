import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {AppEngineStateService, AppEngineState} from './app-engine-state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'angularclient';

  appEngineState: AppEngineState;

  constructor(private router: Router, private stateService: AppEngineStateService) { 
    this.stateService.getConfig()
    .subscribe((data: AppEngineState) => {
      this.appEngineState = data;
      this.onAppEngineStateChange();
    });
  }

  onAppEngineStateChange() {
    console.log("AppEngineState response " + this.appEngineState.state);

    if (this.appEngineState.state === 'refinance')
      this.router.navigate(['refinance']);
    else
      this.router.navigate(['loan-purpose']);
  }
}
