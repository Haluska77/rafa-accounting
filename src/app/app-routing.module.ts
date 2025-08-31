import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountingComponent } from './accounting/accounting.component';
import { ConvertingPaymentComponent } from './converting-payment/converting-payment.component';

export const routes: Routes = [
  { path: 'accounting', component: AccountingComponent },
  { path: 'convertingPayment', component: ConvertingPaymentComponent },
  { path: '', redirectTo: '/accounting', pathMatch: 'full' } // Redirect to accounting by default
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
