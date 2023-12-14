import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl= "http://localhost:8080/api/auth"
  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    const loginUrl = `${this.apiUrl}/login`;
    return this.http.post(loginUrl,{ username, password});
  }
}
