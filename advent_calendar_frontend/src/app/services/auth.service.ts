import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {LoginService} from "./entities/Login.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrlLogin: string = "http://localhost:8080/api/auth/login";
  private apiUrlSecured: string = "http://localhost:8080/api/auth/secured";
  private apiUrlLogout: string = "http://localhost:8080/api/auth/logout";
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  public isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(private http: HttpClient, private loginService: LoginService) {
  }

  login(credentials: { username: string; password: string }) {
    this.loginService.create(this.apiUrlLogin, credentials).subscribe(
      x => {
        this.isLoggedInSubject.next(true);
        console.log("logged in")

      },
      error => {
        console.log("login failed")
        this.isLoggedInSubject.next(false);
      }
    )
  }

  logout() {
    this.http.post(this.apiUrlLogout, null, {withCredentials: true}).subscribe(
      response => {
        this.isLoggedIn();
      }
    )

  }

  isLoggedIn(): void {
    this.http.get(this.apiUrlSecured, {withCredentials: true}).subscribe(
      response => {
        console.log("is logged in");
        this.isLoggedInSubject.next(true);
        sessionStorage.setItem('loggedIn', 'true');
      },
      error => {
        console.log("not logged in");
        this.isLoggedInSubject.next(false);
        sessionStorage.setItem('loggedIn', 'false');
      }
    );
  }


}
