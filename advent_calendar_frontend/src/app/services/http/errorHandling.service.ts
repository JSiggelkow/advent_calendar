import { Injectable } from '@angular/core';
import {ObservableInput, Subject, throwError} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";

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
