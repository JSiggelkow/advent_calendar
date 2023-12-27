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
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  public isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(private http: HttpClient, private loginService: LoginService) {
  }

  login(credentials: { username: string; password: string }) {
    this.loginService.create(this.apiUrlLogin, credentials).subscribe(
      x => {
        if (x.accessToken) {
          sessionStorage.setItem("JWT", x.accessToken);
          this.isLoggedInSubject.next(true);
        } else {
          console.log("login failed")
        }
      },
      error => {
        console.log("login failed")
        this.isLoggedInSubject.next(false);
      }
    )
  }

  logout() {
    this.isLoggedIn();
    this.isLoggedIn$.subscribe( loggedIn => {
      console.log(loggedIn)
      if (loggedIn) {
        sessionStorage.removeItem("JWT");
      }
    });
    this.isLoggedIn();


  }

  isLoggedIn(): void {
    this.http.get(this.apiUrlSecured).subscribe(
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
