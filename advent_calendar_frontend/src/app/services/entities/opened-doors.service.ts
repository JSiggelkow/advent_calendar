import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

export interface OpenedDoors {
  opened_doors_id: number;
  user_id: number;
  door_ids: number[];
}

@Injectable({
  providedIn: 'root'
})
export class OpenedDoorsService {

  private apiUrlAddDoor: string = "http://localhost:8080/api/opened-doors/add-doors?newDoors=";
  private apiUrlGetDoors: string = "http://localhost:8080/api/opened-doors/get-doors";

  constructor(private http: HttpClient) {
  }

  addDoor(doorNum: number) {
    const url = `${this.apiUrlAddDoor}${doorNum}`;
    this.http.post(url, null, {withCredentials: true}).subscribe({
        next: () => {
        },
        error: () => {
          console.log("error saving door id ")
        }
      }
    )
  }

  getDoors(): Observable<number[]> {
    return this.http.get<number[]>(this.apiUrlGetDoors, {withCredentials: true});
  }


}
