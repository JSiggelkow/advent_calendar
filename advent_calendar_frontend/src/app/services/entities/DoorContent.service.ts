import {Injectable} from "@angular/core";
import {GenericCrudService} from "../http/GenericCrud.service";
import {Observable} from "rxjs";

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
    return super.getById(apiUrl, id);
  }
}
