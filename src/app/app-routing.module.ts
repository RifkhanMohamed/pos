import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CheckUserAdmin } from 'src/app/_services/check-user-login'

const routes: Routes = [
  {path : "products", loadChildren : () => import('./products/products.module').then(m=>m.ProductsModule)},
  {path : "branches", loadChildren : () => import('./branches/branches.module').then(m=>m.BranchesModule),canActivate: [CheckUserAdmin]},
  {path : "suppliers", loadChildren : () => import('./suppliers/suppliers.module').then(m=>m.SuppliersModule),canActivate: [CheckUserAdmin]},
  {path : "login", loadChildren : () => import('./login/login.module').then(m=>m.LoginModule)},
  {path : "categories", loadChildren : () => import('./categories/categories.module').then(m=>m.CategoriesModule),canActivate: [CheckUserAdmin]},
  {path : "units", loadChildren : () => import('./units/units.module').then(m=>m.UnitsModule),canActivate: [CheckUserAdmin]},
  {path : "brands", loadChildren : () => import('./brands/brands.module').then(m=>m.BrandsModule),canActivate: [CheckUserAdmin]},
  {path : "signup", loadChildren : () => import('./signup/sign-up.module').then(m=>m.SignUpModule)},
  {path : "home", loadChildren : () => import('./home/home.module').then(m=>m.HomeModule)},
  {path: '', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
