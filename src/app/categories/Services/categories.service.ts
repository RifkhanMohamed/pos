import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../../environments/environment";
import { Observable, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  readonly url= environment.base_url;

  private GetAllCategories= this.url+"/category/get/all";
  private CreateCategory= this.url+"/category/create";

  constructor(private http: HttpClient) { }

  getAllCategories(): Observable<any>{
    return this.http.get<any>(`${this.GetAllCategories}`);
  }
  createCategory(body): Observable<any>{
    return this.http.post<any>(`${this.CreateCategory}`,body);
  }
}
