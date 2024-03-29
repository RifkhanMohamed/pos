import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS 
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenStorageService } from "src/app/_services/token-storage.service";

const TOKEN_HEADER_KEY = 'Authorization';  

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private tokenStorageService:TokenStorageService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    let authReq=request;
    const token=this.tokenStorageService.getToken();
    if(token!=null){
      authReq=request.clone({headers:request.headers.set(TOKEN_HEADER_KEY, 'Bearer '+token)});

    }
    return next.handle(authReq);
  }
}

export const authInterceptorProviders=[
  {provide:HTTP_INTERCEPTORS,useClass:AuthInterceptor,multi:true}
];
