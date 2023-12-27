import {Injectable} from "@angular/core";
import {GenericCrudService} from "../http/GenericCrud.service";
import {Observable} from "rxjs";

export interface LoginData {
  username: string;
  password: string;
  accessToken?: string | undefined
}

@Injectable({
  providedIn: "root"
})
export class LoginService extends GenericCrudService<LoginData> {

  override create(apiUrl: string, entity: LoginData): Observable<LoginData> {
    return super.create(apiUrl, entity);
  }
}
