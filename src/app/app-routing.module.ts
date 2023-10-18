import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AdminRouterComponent } from './admin/admin-router/admin-router.component';
import { adminGuard } from './Guards/admin.guard';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { CategoryAdminComponent } from './admin/category/category-admin/category-admin.component';
import { SubcategoryAdminComponent } from './admin/sub-category-admin/subcategory-admin/subcategory-admin.component';
import { AddProductComponent } from './admin/product-admin/add-product/add-product.component';
import { ProductAdminComponent } from './admin/product-admin/product-admin/product-admin.component';
import { ProductResolverService } from './services/product-resolver.service';
import { UpdateProductComponent } from './admin/product-admin/update-product/update-product.component';
import { HomeComponent } from './components/home/home.component';
import { ProductViewDetailsComponent } from './components/product-view-details/product-view-details.component';
import { SignupComponent } from './components/signup/signup.component';
import { UserOutletComponent } from './user/user-outlet/user-outlet.component';
import { CategoryAllProductsComponent } from './user/category-all-products/category-all-products.component';
import { SubcategroyAllProductsComponent } from './user/subcategroy-all-products/subcategroy-all-products.component';
import { BuyProductInfoComponent } from './user/buy-product-info/buy-product-info.component';
import { BuyProductResolverService } from './services/buy-product-resolver.service';
import { userGuard } from './Guards/user.guard';
import { OrderConfirmPageComponent } from './user/order-confirm-page/order-confirm-page.component';
import { CartViewComponent } from './user/cart-view/cart-view.component';
import { CartResolverService } from './services/cart-resolver.service';
import { UserDashboardComponent } from './user/user-dashboard/user-dashboard.component';
import { OrderViewComponent } from './user/order-view/order-view.component';
import { OrderResolverService } from './services/order-resolver.service';
import { AdminOrderListComponent } from './admin/admin-order-list/admin-order-list.component';
import { CustomerListComponent } from './admin/customer-list/customer-list.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full',
  },
  {
    path: 'signup',
    component: SignupComponent,
    pathMatch: 'full',
  },
 
  {
    path: '',
    component: HomeComponent,
  },

  {
    path: 'admin',
    component: AdminRouterComponent,
    canActivate: [adminGuard],
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path:"customerList",
        component:CustomerListComponent
      },
      {
        path:"orderList",
        component:AdminOrderListComponent
      },
      {
        path: 'category',
        component: CategoryAdminComponent,
      },
      {
        path: 'subcategories/:categoryId',
        component: SubcategoryAdminComponent,
      },
      {
        path: 'product/add/:subCategoryId',
        component: AddProductComponent,
      },
      {
        path: 'product/update',
        component: UpdateProductComponent,
        resolve: {
          product: ProductResolverService,
        },
      },
      {
        path: 'products/:subCategoryId',
        component: ProductAdminComponent,
      },
    ],
  },
  {
    path: 'user',
    component: UserOutletComponent,
    children: [
      {
        path: 'category/products/:catId',
        component: CategoryAllProductsComponent,
      },
      {
        path:"user-dashboard",
        component:UserDashboardComponent,
        canActivate:[userGuard]
      },
      {
        path: 'subcategory/products/:subCategoryId',
        component: SubcategroyAllProductsComponent,
      },
      {
        path: 'view-product',
        component: ProductViewDetailsComponent,
        resolve: {
          product: ProductResolverService,
        },
      },
      {
        path: 'buy',
        component: BuyProductInfoComponent,
        canActivate:[userGuard],
        resolve: {
          productDetails: BuyProductResolverService,
        },
      },
      {
        path: 'cart',
        component: CartViewComponent,
        canActivate:[userGuard],
        resolve: {
          cartDetails: CartResolverService,
        },
      },
      {
        path:'orderConfirm',
        component:OrderConfirmPageComponent,
        canActivate:[userGuard]
      },{
        path:'userOrders',
        component:OrderViewComponent,
        canActivate:[userGuard],
        resolve: {
          orderDetails: OrderResolverService,
        },
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
