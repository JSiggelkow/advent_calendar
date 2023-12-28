import {inject, Injectable} from "@angular/core";
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {catchError, EMPTY, Observable} from "rxjs";
import {ErrorHandlingService} from "../http/errorHandling.service";

@Injectable()
export class HttpErrorInterceptorService implements HttpInterceptor {

  httpErrorService = inject(ErrorHandlingService);
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
          catchError((err: HttpErrorResponse) => {
            if (err.error instanceof Error) {
              console.error('An error occurred:', err.error.message);
            } else {
              this.httpErrorService.publishErrorCode(err.status);
            }
            return EMPTY;
          })
        )
    }

}
