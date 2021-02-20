import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { authInterceptorProviders } from "src/app/_helpers/auth.interceptor";


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers :
  [
    authInterceptorProviders
  ]
})
export class CategoriesModule { }
