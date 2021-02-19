import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../../environments/environment";
@Injectable({
  providedIn: 'root'
})
export class UnitsService {
  readonly url= environment.base_url;

  private GetAllUnits= this.url+"/unit/get/all";
  private CreateUnit=this.url+"/unit/create";
  constructor(private http: HttpClient) { }

  getAllUnits(){
    return this.http.get(this.GetAllUnits);
  }
  createUnit(body){
    return this.http.post(`${this.CreateUnit}`,body)
  }
}
