import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = sessionStorage.getItem('JWT');
    if (token) {
      const authRequest = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${token}`)
      });
      return next.handle(authRequest);
    }
    return next.handle(request);
  }
}
