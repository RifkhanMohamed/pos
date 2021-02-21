import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { authInterceptorProviders } from "src/app/_helpers/auth.interceptor";
import { SignUpComponent } from "./Components/sign-up/sign-up.component";
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

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
    [RouterModule.forChild(routes)],
    ReactiveFormsModule,
    FormsModule
  ],
  providers:[
    authInterceptorProviders
  ]
})
export class SignUpModule { }
