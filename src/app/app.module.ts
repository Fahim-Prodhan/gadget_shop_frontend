import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import { NavbarComponent } from './components/navbar/navbar.component';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { HttpClientModule } from  '@angular/common/http';
import { authInterceptorProviders } from './services/auth.interceptor';
import {MatDividerModule} from '@angular/material/divider';
import {MatTableModule} from '@angular/material/table';
import {MatSelectModule} from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatButtonToggleModule} from '@angular/material/button-toggle';




import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import { NgxPaginationModule } from 'ngx-pagination';
import { AdminRouterComponent } from './admin/admin-router/admin-router.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { AdminSidebarComponent } from './admin/admin-sidebar/admin-sidebar.component';
import { CategoryAdminComponent } from './admin/category/category-admin/category-admin.component';
import { AddCategoryComponent } from './admin/category/add-category/add-category.component';
import { UpdateCategoryComponent } from './admin/category/update-category/update-category.component';
import { AddSubcategoryComponent } from './admin/sub-category-admin/add-subcategory/add-subcategory.component';
import { SubcategoryAdminComponent } from './admin/sub-category-admin/subcategory-admin/subcategory-admin.component';
import { UpdateSubcategoryComponent } from './admin/sub-category-admin/update-subcategory/update-subcategory.component';
import { ProductAdminComponent } from './admin/product-admin/product-admin/product-admin.component';
import { AddProductComponent } from './admin/product-admin/add-product/add-product.component';
import { UpdateProductComponent } from './admin/product-admin/update-product/update-product.component';
import { ShowImageComponent } from './admin/product-admin/show-image/show-image.component';
import { HomeComponent } from './components/home/home.component';
import { ProductViewDetailsComponent } from './components/product-view-details/product-view-details.component';
import { SignupComponent } from './components/signup/signup.component';
import { UserOutletComponent } from './user/user-outlet/user-outlet.component';
import { CategoryAllProductsComponent } from './user/category-all-products/category-all-products.component';
import { SubcategroyAllProductsComponent } from './user/subcategroy-all-products/subcategroy-all-products.component';
import { FooterComponent } from './components/footer/footer.component';
import { BuyProductInfoComponent } from './user/buy-product-info/buy-product-info.component';
import { OrderConfirmPageComponent } from './user/order-confirm-page/order-confirm-page.component';
import { CartViewComponent } from './user/cart-view/cart-view.component';
import { Base64ToImagePipe } from './services/base64-to-image.pipe';
import { UserDashboardComponent } from './user/user-dashboard/user-dashboard.component';
import { OrderViewComponent } from './user/order-view/order-view.component';
import { AdminOrderListComponent } from './admin/admin-order-list/admin-order-list.component';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { NgxUiLoaderHttpModule } from 'ngx-ui-loader';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { CustomerListComponent } from './admin/customer-list/customer-list.component';






@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    AdminRouterComponent,
    DashboardComponent,
    AdminSidebarComponent,
    CategoryAdminComponent,
    AddCategoryComponent,
    UpdateCategoryComponent,
    AddSubcategoryComponent,
    SubcategoryAdminComponent,
    UpdateSubcategoryComponent,
    ProductAdminComponent,
    AddProductComponent,
    UpdateProductComponent,
    ShowImageComponent,
    HomeComponent,
    ProductViewDetailsComponent,
    SignupComponent,
    UserOutletComponent,
    CategoryAllProductsComponent,
    SubcategroyAllProductsComponent,
    FooterComponent,
    BuyProductInfoComponent,
    OrderConfirmPageComponent,
    CartViewComponent,
    Base64ToImagePipe,
    UserDashboardComponent,
    OrderViewComponent,
    AdminOrderListComponent,
    CustomerListComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatSnackBarModule,
    HttpClientModule,
    MatCardModule,
    MatIconModule,
    MatDialogModule,
    NgxPaginationModule,
    MatDividerModule,
    MatTableModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatGridListModule,
    MatButtonToggleModule,
    NgxUiLoaderModule,
    NgxUiLoaderHttpModule.forRoot({
      showForeground:true,
    }),
    CKEditorModule,
    
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
