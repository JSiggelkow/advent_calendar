import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {LoginService} from "./entities/Login.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrlLogin: string = "http://localhost:8080/api/auth/login";
  private apiUrlLogout: string = "http://localhost:8080/api/auth/logout";
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  public isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(private http: HttpClient, private loginService: LoginService) {
  }

  login(credentials: { username: string; password: string }) {
    this.loginService.create(this.apiUrlLogin, credentials).subscribe({
      next: () => {
        sessionStorage.setItem("loggedIn", "true");
        this.isLoggedInSubject.next(true);
      },
      error: () => {
        sessionStorage.setItem("loggedIn", "false");
        this.isLoggedInSubject.next(false);
      }
    });
  }


  logout() {
    this.http.post(this.apiUrlLogout, null, {withCredentials: true}).subscribe(
      () => {
        sessionStorage.setItem("loggedIn", "false");
        this.isLoggedInSubject.next(false);
      }
    );
  }
}
