import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {LoginService} from "./entities/Login.service";
import {ErrorHandlingService} from "./http/errorHandling.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrlLogin: string = "http://localhost:8080/api/auth/login";
  private apiUrlLogout: string = "http://localhost:8080/api/auth/logout";
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  public isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(private http: HttpClient, private loginService: LoginService, private errorHandling: ErrorHandlingService) {
  }

  login(credentials: { username: string; password: string }) {
    this.loginService.create(this.apiUrlLogin, credentials).subscribe(
      () => {
        sessionStorage.setItem("loggedIn", "true");
        this.isLoggedInSubject.next(true);
      },
      error => {
        sessionStorage.setItem("loggedIn", "false");
        this.isLoggedInSubject.next(false);
        if (error.status === 403) {
          this.errorHandling.publishErrorCode(error.status);
        }
      }
    );
  }

  logout() {
    this.http.post(this.apiUrlLogout, null, {withCredentials: true}).subscribe(
      () => {
        sessionStorage.setItem("loggedIn", "false");
        this.isLoggedInSubject.next(false);
      }
    )

  }



}
