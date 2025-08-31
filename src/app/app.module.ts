import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { SelectModule } from './select/select.module';
import { AccountingComponent } from './accounting/accounting.component';
import { ConvertingPaymentComponent } from './converting-payment/converting-payment.component';
import {ClipboardModule} from '@angular/cdk/clipboard';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AccountingComponent,
    ConvertingPaymentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SelectModule,
    ClipboardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
