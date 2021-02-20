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

  constructor(private http: HttpClient) { console.log(this.url);
  }

  getAllProducts(){
    return this.http.get(this.GetAllProducts);
  }

  createProduct(body){
    return this.http.post(`${this.CreateProduct}`,body)
  }
  // deleteProduct(productId): Observable<any[]> {
  //   return this.http.get<any[]>(this.DeleteProduct + `${productId}`);
  // }
  deleteProduct(productId): Observable<any> {
    return this.http.post(`${this.DeleteProduct}${productId}`, {responseType: 'text'});
  }
}