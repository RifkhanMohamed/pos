import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { authInterceptorProviders } from "../_helpers/auth.interceptor";
import { Routes } from '@angular/router';
import { GetBrandsComponent } from "./Components/get-brands/get-brands.component";

const routes: Routes = [
  {
    path: '',
    component: GetBrandsComponent
  }
];
@NgModule({
  declarations: [GetBrandsComponent],
  imports: [
    CommonModule
  ],
  providers :
  [
    authInterceptorProviders
  ]
})
export class BrandsModule { }
