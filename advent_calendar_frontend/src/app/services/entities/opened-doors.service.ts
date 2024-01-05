import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

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

  constructor(private http: HttpClient) { }

  addDoor(doorNum: number) {
    const url = `${this.apiUrlAddDoor}${doorNum}`;
    this.http.post(url, null, {withCredentials: true}).subscribe({
      next: () => {
        console.log("door id saved")
      },
      error: () => {
        console.log("error saving door id ")
      }
      }
    )
  }


}
