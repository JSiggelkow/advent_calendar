import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {LoginService} from "./Login.service";
import {GenericCrudService} from "../http/GenericCrud.service";
import {error} from "@angular/compiler-cli/src/transformers/util";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrlLogin: string = "http://localhost:8080/api/auth/login";
  private apiUrlLogout: string = "http://localhost:8080/api/auth/logout";
  private apiUrlFindUsername: string = "http://localhost:8080/api/users/find";
  private apiUrlSignUp: string = "http://localhost:8080/api/users";
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  public isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(private http: HttpClient, private loginService: LoginService, private genericCrud: GenericCrudService<boolean>) {
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

  signUp(credentials: {username: string; password: string}) {
    this.http.post(this.apiUrlSignUp, credentials).subscribe({
      next: () => {
        console.log("signup erfolgreich");
      },
      error: () => {
        console.log("error")
      }
      }
    )
  }

  checkUsername(username: string) {
    return this.genericCrud.getByStringViaParam(this.apiUrlFindUsername,"username",username);
  }
}
