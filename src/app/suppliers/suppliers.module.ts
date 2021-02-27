import { NgModule } from '@angular/core';
import { GetSuppliersComponent } from '../suppliers/Components/get-suppliers/get-suppliers.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from "@angular/material/table";
import { CommonModule,CurrencyPipe } from '@angular/common';
import { ReactiveFormsModule } from "@angular/forms";
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import { AgGridModule } from 'ag-grid-angular';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FormsModule } from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { TagInputModule } from 'ngx-chips';
import { authInterceptorProviders } from 'src/app/_helpers/auth.interceptor';
import { AccountDetailsComponent } from './Components/account-details/account-details/account-details.component'

const routes: Routes = [
  {
    path: '',
    component: GetSuppliersComponent
  },
  {
    path: 'accounts',
    component: AccountDetailsComponent
  }
];

@NgModule({
  declarations: [
    GetSuppliersComponent,
    AccountDetailsComponent
  ],
  imports: [
    [RouterModule.forChild(routes)],
    CommonModule,
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
    authInterceptorProviders
  ]
})
export class SuppliersModule { }
