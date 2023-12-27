import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GenericCrudService<T> {
  constructor(private http: HttpClient) { }

  getAll(apiUrl: string): Observable<T[]> {
    return this.http.get<T[]>(apiUrl, {withCredentials: true});
  }

  getById(apiUrl: string, id: number): Observable<T> {
    return this.http.get<T>(`${apiUrl}/${id}`, {withCredentials: true});
  }

  create(apiUrl: string, entity: T): Observable<T> {
    return this.http.post<T>(apiUrl, entity, {withCredentials: true});
  }

  update(apiUrl: string, id: number, entity: T): Observable<T> {
    return this.http.put<T>(`${apiUrl}/${id}`, entity, {withCredentials: true});
  }

  delete(apiUrl: string, id: number): Observable<void> {
    return this.http.delete<void>(`${apiUrl}/${id}`, {withCredentials: true});
  }
}
