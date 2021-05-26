import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../../environments/environment";
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class HomeService {
  readonly url= environment.base_url;
  
  private GetAllCategories=this.url+"/category/get/all";
  private GetImage=this.url+"/image/getById";
  private GetProductByCategory=this.url+"/product/get/byCategoryId";

  constructor(private http: HttpClient) { }

  getAllCategories(): Observable<any>{
    return this.http.get<any>(this.GetAllCategories);
  }
  getImage(id): Observable<any>{
    const url=`${this.GetImage}/${id}`
    return this.http.get<any>(url);
  }
  getProductByCategory(id):Observable<any>{
    const url=`${this.GetProductByCategory}/${id}`
    return this.http.get<any>(url);
  }
}
