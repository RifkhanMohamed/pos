import { NgModule } from '@angular/core';
import { CommonModule,CurrencyPipe } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { authInterceptorProviders } from "src/app/_helpers/auth.interceptor";
import { HomeComponent } from "./Components/home/home.component";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { AgGridModule } from 'ag-grid-angular';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { TagInputModule } from 'ngx-chips';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  }
];



@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    [RouterModule.forChild(routes)],
    FormsModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatSortModule,
    AgGridModule.withComponents([]),
    Ng2SearchPipeModule,
    FormsModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    RxReactiveFormsModule,
    TagInputModule
  ],
  providers:[
    CurrencyPipe,
    authInterceptorProviders
  ]
})
export class HomeModule { }
