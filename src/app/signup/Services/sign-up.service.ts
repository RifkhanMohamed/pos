import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from "../../../environments/environment";
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SignUpService {
  readonly url= environment.base_url;
  
  private GetAllTowns= this.url+"/city/get/all";
  private IsExistMail=this.url+"/isExist";
  private SignUp=this.url+"/api/auth/signup";

  constructor(private http: HttpClient) { }

  getAllTowns(): Observable<any>{
    return this.http.get<any>(this.GetAllTowns);
  }
  isExistMail(mail): Observable<any>{
    const url=`${this.IsExistMail}/${mail}`
    return this.http.get<any>(url);
  }
}
