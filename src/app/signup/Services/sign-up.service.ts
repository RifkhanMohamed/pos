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
  private UserMailGetAll=this.url+"/userMail/get/all";
  private UserPhoneGetAll=this.url+"/userPhone/get/all";
  private UserNicGetAll=this.url+"/userNic/get/all";
  private SignUp=this.url+"/api/auth/signup";

  constructor(private http: HttpClient) { }

  getAllTowns(): Observable<any>{
    return this.http.get<any>(this.GetAllTowns);
  }
  isExistMail(mail): Observable<any>{
    const url=`${this.IsExistMail}/${mail}`
    return this.http.get<any>(url);
  }
  userMailGetAll(): Observable<any>{
    const url=`${this.UserMailGetAll}`
    return this.http.get<any>(url);
  }
  userPhoneGetAll(): Observable<any>{
    const url=`${this.UserPhoneGetAll}`
    return this.http.get<any>(url);
  }
  userNicGetAll(): Observable<any>{
    const url=`${this.UserNicGetAll}`
    return this.http.get<any>(url);
  }
  signUp(body): Observable<any>{
    const url=`${this.SignUp}`
    return this.http.post<any>(url,body);
  }
}
