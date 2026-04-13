import { Routes } from '@angular/router';
import { Landingpage } from './landing/landingpage/landingpage';
import { CheckoutComponent } from './checkout/checkout.component/checkout.component';

export const routes: Routes = [
    { path: '', component: Landingpage  },
    { path: 'checkout', component: CheckoutComponent },
];
