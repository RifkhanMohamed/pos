import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { authInterceptorProviders } from "src/app/_helpers/auth.interceptor";
import { HomeComponent } from "./Components/home/home.component";


const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  }
];



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    [RouterModule.forChild(routes)]
  ],
  providers:[
    authInterceptorProviders
  ]
})
export class HomeModule { }
