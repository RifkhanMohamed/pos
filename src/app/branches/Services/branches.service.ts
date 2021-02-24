import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../../environments/environment";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BranchesService {
  readonly url= environment.base_url;
  private GetAllBranches= this.url+"/branch/get/all";
  private CreateBranch=this.url+"/branch/create";
  private DeleteBranch=this.url+"/branch/delete/";
  private UpdateBranch=this.url+"/branch/update";

  constructor(private http: HttpClient) { }

  getAllBranches(){
    return this.http.get(this.GetAllBranches);
  }
  createBranch(body): Observable<any> {
    return this.http.post<any>(`${this.CreateBranch}`,body)
  }
  deleteBranch(branchId): Observable<any> {
    return this.http.post(`${this.DeleteBranch}${branchId}`, {responseType: 'text'});
  }
  updateBranch(body): Observable<any> {
    return this.http.put<any>(`${this.UpdateBranch}`,body)
  }
}
