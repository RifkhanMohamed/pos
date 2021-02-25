import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../../environments/environment";
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CustomersService {
  readonly url= environment.base_url;

  private GetAllCustomers= this.url+"/customer/get/all";
  private GetAllPhones=this.url+"/customerPhone/get/all";
  private GetAllMail=this.url+"/customerMail/get/all";
  private CreateCustomer=this.url+"/customer/create";
  private DeleteCustomer=this.url+"/customer/delete";

  constructor(private http: HttpClient) { }
  

  getAllCustomers(): Observable<any>{
    return this.http.get<any>(this.GetAllCustomers);
  }

  getAllPhones(): Observable<any>{
    return this.http.get<any>(this.GetAllPhones);
  }
  
  getAllMail(): Observable<any>{
    return this.http.get<any>(this.GetAllMail);
  }

  createCustomer(body): Observable<any>{
    return this.http.post<any>(this.CreateCustomer,body);
  }

  deleteCustomer(customerId): Observable<any>{
    const url=`${this.DeleteCustomer}/${customerId}`;
    return this.http.post<any>(url, {responseType: 'text'});
  }
}
