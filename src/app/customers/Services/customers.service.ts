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

  constructor(private http: HttpClient) { }
  

  getAllCustomers(){
    return this.http.get(this.GetAllCustomers);
  }
}
