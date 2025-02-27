import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { authGuard } from './core/guards/auth.guard';
import { loggedGuard } from './core/guards/logged.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },


  {
    path: '',
   
    component: AuthLayoutComponent,
    canActivate:[loggedGuard],
    children: [
      { path: 'login', loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent), title: 'Login',
       
       },
      { path: 'register', loadComponent: () => import('./pages/register/register.component').then(m => m.RegisterComponent), title: 'Register' },
      { path: 'forgotPassword', loadComponent: () => import('./pages/forgot-password/forgot-password.component').then(m => m.ForgotPasswordComponent), title: 'forgotPassword' },
    ]
  },


  {
    path: '',
    component: BlankLayoutComponent,
    canActivate:[authGuard],
    children: [
      { path: 'home', loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent), title: 'Home'
       },
      { path: 'cart', loadComponent: () => import('./pages/cart/cart.component').then(m => m.CartComponent), title: 'Cart' },
      { path: 'products', loadComponent: () => import('./pages/products/products.component').then(m => m.ProductsComponent), title: 'Products' },
      { path: 'brands', loadComponent: () => import('./pages/brands/brands.component').then(m => m.BrandsComponent), title: 'Brands' },
      { path: 'categories', loadComponent: () => import('./pages/categories/categories.component').then(m => m.CategoriesComponent), title: 'Categories' },


      { path: 'wishlist', loadComponent: () => import('./pages/wishlist/wishlist.component').then(m => m.WishlistComponent), title: 'Wishlist' },
      {path:'categoryDetails/:id',loadComponent:()=>import('./pages/category-details/category-details.component').then(m=>m.CategoryDetailsComponent),title:'CategoryDetails'},
      { path: 'allorders', loadComponent: () => import('./pages/allorders/allorders.component').then(m => m.AllordersComponent), title: 'allorders' },
      { path: 'checkout/:id', loadComponent: () => import('./pages/checkout/checkout.component').then(m => m.CheckoutComponent), title: 'Checkout' },
      { path: 'details/:id',loadComponent:()=>import('./pages/details/details.component').then(m=>m.DetailsComponent),title:'Details' },
      { path: '**', component: NotfoundComponent, title: 'notfoundComponent' },
    ]
  }
];

