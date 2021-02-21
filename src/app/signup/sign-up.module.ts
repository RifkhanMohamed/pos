import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { authInterceptorProviders } from "src/app/_helpers/auth.interceptor";
import { SignUpComponent } from "./Components/sign-up/sign-up.component";


const routes: Routes = [
  {
    path: '',
    component: SignUpComponent
  }
];


@NgModule({
  declarations: [SignUpComponent],
  imports: [
    CommonModule,
    [RouterModule.forChild(routes)]
  ],
  providers:[
    authInterceptorProviders
  ]
})
export class SignUpModule { }
