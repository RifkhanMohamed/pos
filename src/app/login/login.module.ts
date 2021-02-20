import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from "./Components/login.component";
import { authInterceptorProviders } from 'src/app/_helpers/auth.interceptor';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  }
];

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    [RouterModule.forChild(routes)],
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers:[
    authInterceptorProviders
  ]
})
export class LoginModule { }
