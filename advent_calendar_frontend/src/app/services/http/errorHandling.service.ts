import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlingService {
  private errorCodeSubject = new Subject<number>();

  errorCode$ = this.errorCodeSubject.asObservable();
  publishErrorCode(errorCode: number) {
    this.errorCodeSubject.next(errorCode);
  }
}
