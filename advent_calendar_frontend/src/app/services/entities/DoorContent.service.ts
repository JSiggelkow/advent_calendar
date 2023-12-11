import {Injectable} from "@angular/core";
import {GenericCrudService} from "../http/GenericCrud.service";
import {catchError, Observable, throwError} from "rxjs";

export interface DoorContent {
  doorContentId: number;
  doorId: number;
  photoLink: string;
  text: string;
  videoLink: string;
}

@Injectable({
  providedIn: 'root'
})
export class DoorContentService extends GenericCrudService<DoorContent>{

  override getById(apiUrl: string, id: number): Observable<DoorContent> {
    return super.getById(apiUrl, id).pipe(
      catchError((error) => {
        if (error.status === 403) {
          // Handle Forbidden error here
          console.log('Forbidden Error:', error);
          return throwError(null);
        }
        return throwError(error);
      })
    );
  }
}
