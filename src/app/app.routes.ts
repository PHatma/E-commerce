import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { BrandsComponent } from './components/brands/brands.component';
import { CartComponent } from './components/cart/cart.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { HomeComponent } from './components/home/home.component';
import { ProductComponent } from './components/product/product.component';
import { authGuard } from './core/guards/auth.guard';
import { DetailsComponent } from './components/details/details.component';
import { ForgotpasswordComponent } from './components/forgotpassword/forgotpassword.component';
import { AllordersComponent } from './components/allorders/allorders.component';
import { OrdersComponent } from './components/orders/orders.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';

export const routes: Routes = [
  {path:'' ,component:AuthLayoutComponent ,children:[
    {path:'' ,redirectTo:'login' ,pathMatch:'full'},
   { path:'login' ,component:LoginComponent},
   { path:'register' ,component:RegisterComponent},
   { path:'forget' ,component:ForgotpasswordComponent},

  ]},
  {path:'' ,component:BlankLayoutComponent,canActivate:[authGuard] ,children:[
    {path:'' ,redirectTo:'home' ,pathMatch:'full'},
    { path:'brands' ,component:BrandsComponent},
    { path:'cart' ,component:CartComponent},
    { path:'categories' ,component:CategoriesComponent},
    { path:'home' ,component:HomeComponent},
    { path:'wishlist' ,component:WishlistComponent},
    { path:'product' ,component:ProductComponent},
    { path:'details/:id' ,component:DetailsComponent},
    { path:'allorders' ,component:AllordersComponent},
    { path:'orders/:id' ,component:OrdersComponent},




   ]},
  {path:'**' ,component:NotfoundComponent},


];
