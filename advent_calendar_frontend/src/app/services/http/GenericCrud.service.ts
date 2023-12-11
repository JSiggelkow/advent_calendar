import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GenericCrudService<T> {
  constructor(private http: HttpClient) { }

  getAll(apiUrl: string): Observable<T[]> {
    return this.http.get<T[]>(apiUrl);
  }

  getById(apiUrl: string, id: number): Observable<T> {
    return this.http.get<T>(`${apiUrl}/${id}`);
  }

  create(apiUrl: string, entity: T): Observable<T> {
    return this.http.post<T>(apiUrl, entity);
  }

  update(apiUrl: string, id: number, entity: T): Observable<T> {
    return this.http.put<T>(`${apiUrl}/${id}`, entity);
  }

  delete(apiUrl: string, id: number): Observable<void> {
    return this.http.delete<void>(`${apiUrl}/${id}`);
  }
}
