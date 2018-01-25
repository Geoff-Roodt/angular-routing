import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpModule} from '@angular/http'
import {RouterModule, Routes} from '@angular/router';
import {FormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';

import {AuthInjectables} from './auth.service';
import { LoginComponent } from './login/login.component';
import { ProtectedComponent } from './protected/protected.component';
import {LoggedInGuard} from './logged-in.guard';
import { ProductsComponent } from './products/products.component';


const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'about', component: AboutComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'contactus', redirectTo: 'contact'},

  {path: 'login', component: LoginComponent},
  {path:'protected', component: ProtectedComponent, canActivate: [LoggedInGuard]},
  {path:'products', component: ProductsComponent, children: childRoutes}
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    ContactComponent,
    LoginComponent,
    ProtectedComponent,
    ProductsComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    AuthInjectables,
    LoggedInGuard
    //{provide: LocationStrategy, useClass: HashLocationStrategy},
  ],
  bootstrap: [AppComponent]
})


export class AppModule {


}
