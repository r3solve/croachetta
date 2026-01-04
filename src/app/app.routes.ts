import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ShopComponent } from './pages/shop/shop.component';
import { CartComponent } from './pages/cart/cart.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { AdminBaseComponent } from './pages/admin/admin-base.component';
import { LoginComponent } from './pages/admin/login.component';
import { AdminHomeComponent } from './pages/admin/admin-home.component';
import { MainLayoutComponent } from './layouts/main-layout.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    {
        path: '',
        component: MainLayoutComponent,
        children: [
            { path: '', component: HomeComponent },
            { path: 'shop', component: ShopComponent },
            { path: 'shop/:id', loadComponent: () => import('./pages/shop/product-detail.component').then(m => m.ProductDetailComponent) },
            { path: 'cart', component: CartComponent },
            { path: 'about', component: AboutComponent },
            { path: 'contact', component: ContactComponent },
        ]
    },
    {
        path: 'admin', component: AdminBaseComponent,
        children: [
            { path: '', component: AdminHomeComponent, canActivate: [authGuard] },
            { path: 'home', component: AdminHomeComponent, canActivate: [authGuard] },
            { path: 'orders', loadComponent: () => import('./pages/admin/admin-orders.component').then(m => m.AdminOrdersComponent), canActivate: [authGuard] },
            { path: 'login', component: LoginComponent }
        ]
    },
    { path: '**', redirectTo: '' }
];
