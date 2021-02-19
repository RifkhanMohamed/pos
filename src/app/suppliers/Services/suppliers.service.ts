import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../../environments/environment";
@Injectable({
  providedIn: 'root'
})
export class SuppliersService {
  readonly url= environment.base_url;

  private GetAllSuppliers= this.url+"/supplier/get/all";
  private CreateSupplier= this.url+"/supplier/create";

  constructor(private http: HttpClient) { }

  getAllSuppliers(){
    return this.http.get(this.GetAllSuppliers);
  }
  createSupplier(body){
    return this.http.post(`${this.CreateSupplier}`,body);
  }
}
