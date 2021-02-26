import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomersComponent } from './Components/customers.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { authInterceptorProviders } from 'src/app/_helpers/auth.interceptor';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import {NgxPaginationModule} from 'ngx-pagination';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { MatTableModule } from "@angular/material/table";
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import { AccountDetailsComponent } from './Components/accounts-details/account-details/account-details.component';
const routes: Routes = [
  {
    path: '',
    component: CustomersComponent
  },
  {
    path: 'accounts',
    component: AccountDetailsComponent
  }
];

@NgModule({
  declarations: [CustomersComponent, AccountDetailsComponent],
  imports: [
    CommonModule,
    [RouterModule.forChild(routes)],
    HttpClientModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule,
    FormsModule,
    NgxPaginationModule,
    RxReactiveFormsModule,
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatSortModule,
  ],
  providers:[
    authInterceptorProviders
  ]
})
export class CustomersModule { }
