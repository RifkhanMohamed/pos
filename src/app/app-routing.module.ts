import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CheckUserAdmin,CheckUserOrAdminOrSuperAdmin } from 'src/app/_services/check-user-login'

const routes: Routes = [
  {path : "products", loadChildren : () => import('./products/products.module').then(m=>m.ProductsModule)},
  {path : "branches", loadChildren : () => import('./branches/branches.module').then(m=>m.BranchesModule),canActivate: [CheckUserOrAdminOrSuperAdmin]},
  {path : "suppliers", loadChildren : () => import('./suppliers/suppliers.module').then(m=>m.SuppliersModule),canActivate: [CheckUserOrAdminOrSuperAdmin]},
  {path : "login", loadChildren : () => import('./login/login.module').then(m=>m.LoginModule)},
  {path : "categories", loadChildren : () => import('./categories/categories.module').then(m=>m.CategoriesModule),canActivate: [CheckUserOrAdminOrSuperAdmin]},
  {path : "units", loadChildren : () => import('./units/units.module').then(m=>m.UnitsModule),canActivate: [CheckUserOrAdminOrSuperAdmin]},
  {path : "brands", loadChildren : () => import('./brands/brands.module').then(m=>m.BrandsModule),canActivate: [CheckUserOrAdminOrSuperAdmin]},
  {path : "signup", loadChildren : () => import('./signup/sign-up.module').then(m=>m.SignUpModule)},
  {path : "home", loadChildren : () => import('./home/home.module').then(m=>m.HomeModule)},
  {path : "customer", loadChildren : () => import('./customers/customers.module').then(m=>m.CustomersModule),canActivate: [CheckUserOrAdminOrSuperAdmin]},
  {path: '', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
