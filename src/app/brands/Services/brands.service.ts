import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../../environments/environment";
@Injectable({
  providedIn: 'root'
})
export class BrandsService {
  readonly url= environment.base_url;

  private GetAllBrands= this.url+"/brand/get/all";
  private CreateBrand=this.url+"/brand/create";
  
  constructor(private http: HttpClient) { }

  getAllBrands(){
    return this.http.get(this.GetAllBrands);
  }
  createBrand(body){
    return this.http.post(`${this.CreateBrand}`,body);
  }
}
