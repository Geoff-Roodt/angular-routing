import {Routes} from '@angular/router';
import {ProductsComponent} from './products.component';


export const routes: Routes = [
  {path: '', redirectTo: 'main', pathMatch: 'full'},
  {path: 'main', component: MainComponent},
  {path: 'more-info', component: MoreInfoComponent},
  {path: ':id', component: ProductsComponent},

];
