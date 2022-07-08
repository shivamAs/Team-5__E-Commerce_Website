import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomerComponent } from './Components/customer/customer.component';
import { AuthenticateComponent } from './Components/authenticate/authenticate.component';
import { ItemsComponent } from './Components/customer/items/items.component';
import { CarryBoxComponent } from './Components/customer/carry-box/carry-box.component';
import { MyOrdersComponent } from './Components/customer/my-orders/my-orders.component';
import { HomeComponent } from './Components/customer/home/home.component';
import { PlaceOrderComponent } from './Components/customer/place-order/place-order.component';
import { TrackOrderComponent } from './Components/customer/track-order/track-order.component';
import { FilterItemsPipe } from './Pipes/CustomerPipes/filter-items/filter-items.pipe';
import { FilterCarryBoxItemsPipe } from './Pipes/CustomerPipes/filter-carryBoxItems/filter-carry-box-items.pipe';
import { AdminHomeComponent } from './Components/admin-home/admin-home.component';
import { DashboardComponent } from './Components/admin-home/dashboard/dashboard.component';
import { OrdersComponent } from './Components/admin-home/orders/orders.component';
import { AddItemComponent } from './Components/admin-home/add-item/add-item.component';
import { AddCategoryComponent } from './Components/admin-home/add-category/add-category.component';
import { AddSubcategoryComponent } from './Components/admin-home/add-subcategory/add-subcategory.component';
import { RolesPermissionsComponent } from './Components/admin-home/roles-permissions/roles-permissions.component';
import { CategoriesComponent } from './Components/admin-home/categories/categories.component';
import { SubcategoriesComponent } from './Components/admin-home/subcategories/subcategories.component';
import { MergeArrayPipe } from './Pipes/AdminPipes/merge-array.pipe';
import { SearchSubCategoryPipe } from './Pipes/AdminPipes/search-sub-category.pipe';
import { SearchCategoryPipe } from './Pipes/AdminPipes/search-category.pipe';
import { ItemsAdminComponent } from './Components/admin-home/items-admin/items-admin.component';
import { LoginComponent } from './Components/authenticate/login/login.component';
import { SignUpComponent } from './Components/authenticate/sign-up/sign-up.component';
import { ResetNowComponent } from './Components/authenticate/reset-password/reset-now.component';
import { ResetPasswordComponent } from './Components/authenticate/reset-password/reset-password.component';
import { SearchItemsPipe } from './Pipes/AdminPipes/search-items.pipe';
import { LoggingService } from './Models/LoggingService';
import { FilterParameterPipe } from './Pipes/CustomerPipes/filter-parameter/filter-parameter.pipe';
import { MyAccountComponent } from './Components/customer/my-account/my-account.component';
import { SortItemsPipe } from './Pipes/CustomerPipes/sort-items/sort-items.pipe';

@NgModule({
  declarations: [
    AppComponent,
    
    //customer components and pipes
    CustomerComponent,
    AuthenticateComponent,
    ItemsComponent,
    FilterItemsPipe,
    FilterCarryBoxItemsPipe,
    CarryBoxComponent,
    MyOrdersComponent,
    HomeComponent,
    PlaceOrderComponent,
    TrackOrderComponent,
    FilterParameterPipe,


    //Admin components and pipes
    AdminHomeComponent,
    DashboardComponent,
    OrdersComponent,
    AddItemComponent,
    AddCategoryComponent,
    AddSubcategoryComponent,
    RolesPermissionsComponent,
    CategoriesComponent,
    SubcategoriesComponent,
    MergeArrayPipe,
    SearchSubCategoryPipe,
    SearchCategoryPipe,
    ItemsAdminComponent,


    //Authenticate components
    LoginComponent,
    SignUpComponent,
    ResetNowComponent,
    ResetPasswordComponent,
    SearchItemsPipe,
    MyAccountComponent,
    SortItemsPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [LoggingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
