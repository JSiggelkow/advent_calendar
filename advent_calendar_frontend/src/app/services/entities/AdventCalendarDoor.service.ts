import {GenericCrudService} from "../http/GenericCrud.service";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";

export interface AdventCalendarDoor {
  door_id: number;
  door_number: number;
  opening_date: string;
}

@Injectable({
  providedIn: 'root'
})
export class AdventCalendarDoorService extends GenericCrudService<AdventCalendarDoor> {


  override getAll(apiUrl: string): Observable<AdventCalendarDoor[]> {
    return super.getAll(apiUrl);
  }
}
