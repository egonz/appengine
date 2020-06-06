import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppEngineStateService {

  constructor(private http: HttpClient) { }

  stateUrl = 'assets/config.json';

  getConfig() {
    return this.http.get<AppEngineState>(this.stateUrl);
  }
}

export interface AppEngineState {
  state: string;
}
