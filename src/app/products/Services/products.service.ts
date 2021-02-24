import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../../environments/environment";
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  readonly url= environment.base_url;
  
  private GetAllProducts= this.url+"/product/get/all";
  private CreateProduct=this.url+"/product/create";
  private DeleteProduct=this.url+"/product/delete/";
  private UpdateProduct=this.url+"/product/update";

  constructor(private http: HttpClient) { console.log(this.url);
  }

  getAllProducts(): Observable<any>{
    return this.http.get<any>(this.GetAllProducts);
  }

  createProduct(body): Observable<any>{
    return this.http.post<any>(`${this.CreateProduct}`,body)
  }

  deleteProduct(productId): Observable<any> {
    return this.http.post<any>(`${this.DeleteProduct}${productId}`, {responseType: 'text'});
  }

  updateProduct(body): Observable<any>{
    return this.http.put<any>(`${this.UpdateProduct}`,body)
  }
}
