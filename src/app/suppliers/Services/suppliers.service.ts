import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../../environments/environment";
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SuppliersService {
  readonly url= environment.base_url;

  private GetAllSuppliers= this.url+"/supplier/get/all";
  private CreateSupplier= this.url+"/supplier/create";
  private GetAllMail=this.url+"/supplierMail/get/all";
  private GetAllPhone=this.url+"/supplierPhone/get/all";
  private DeleteSupplier=this.url+"/supplier/delete";
  private EditSupplier=this.url+"/supplier/update";

  constructor(private http: HttpClient) { }

  getAllSuppliers(): Observable<any>{
    return this.http.get<any>(this.GetAllSuppliers);
  }
  createSupplier(body): Observable<any>{
    return this.http.post<any>(`${this.CreateSupplier}`,body);
  }
  getAllMail(): Observable<any>{
    return this.http.get<any>(`${this.GetAllMail}`);
  }
  getAllPhone(): Observable<any>{
    return this.http.get<any>(`${this.GetAllPhone}`);
  }
  deleteSupplier(id):Observable<any>{
    return this.http.post<any>(`${this.DeleteSupplier}/${id}`, {responseType: 'text'});
  }
  editSupplier(body): Observable<any>{
    return this.http.put<any>(`${this.EditSupplier}`,body);
  }
}
