import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import { AppComponent } from './app.component';


const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: 'HomeComponent'},
  {path: 'about', component: 'AboutComponent'},
  {path: 'contact', component: 'ContactComponent'},
  {path: 'contactus', redirectTo: 'contact'},

  // required for the authentication demo
  {path: 'login', component: LoginComponent},
  {path:'protected', component: ProtectedComponent, canActivate: [LoggedInGuard]},
  {path:'products', component: ProductsComponent, children: childRoutes}
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    {provide: APP_BASE_HREF, useValue: '/'}
  ],
  bootstrap: [AppComponent]
})


export class AppModule {


}
