import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../../environments/environment";
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class BrandsService {
  readonly url= environment.base_url;

  private GetAllBrands= this.url+"/brand/get/all";
  private CreateBrand=this.url+"/brand/create";
  
  constructor(private http: HttpClient) { }

  getAllBrands(): Observable<any>{
    return this.http.get<any>(this.GetAllBrands);
  }
  createBrand(body): Observable<any>{
    return this.http.post<any>(`${this.CreateBrand}`,body);
  }
}
