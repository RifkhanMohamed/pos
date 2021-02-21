import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenStorageService } from './token-storage.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class CheckUserAdmin implements CanActivate{
    private roles : string[];
    constructor(private tokenStorageService: TokenStorageService,private router: Router){ }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | import("@angular/router").UrlTree | Observable<boolean | import("@angular/router").UrlTree> | Promise<boolean | import("@angular/router").UrlTree> {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      if(this.roles.includes('ROLE_ADMIN')){
        return true;
      }
      else{
      this.router.navigate(['home']);
      return false;
      }
    }
  }