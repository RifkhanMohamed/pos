import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GetUnitsComponent } from './Components/get-units/get-units.component'
import { RouterModule, Routes } from '@angular/router';
import { authInterceptorProviders } from "src/app/_helpers/auth.interceptor";


const routes: Routes = [
  {
    path: '',
    component: GetUnitsComponent
  }
];
@NgModule({
  declarations: [GetUnitsComponent],
  imports: [
    CommonModule,
    [RouterModule.forChild(routes)]
  ],
  providers:[
    authInterceptorProviders
  ]
})
export class UnitsModule { }
