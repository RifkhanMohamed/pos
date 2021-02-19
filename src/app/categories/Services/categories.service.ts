import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../../environments/environment";
@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  readonly url= environment.base_url;

  private GetAllCategories= this.url+"/category/get/all";
  private CreateCategory= this.url+"/category/create";

  constructor(private http: HttpClient) { }

  getAllCategories(){
    return this.http.get(this.GetAllCategories);
  }
  createCategory(body){
    return this.http.post(`${this.CreateCategory}`,body);
  }
}
