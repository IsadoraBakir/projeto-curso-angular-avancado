import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AccountRoutingModule } from './account.route';

import { ContaAppComponent } from './account.app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';

import { AccountService } from './services/account.service';
import { AccountGuard } from './services/account.guard';

@NgModule({
  declarations: [
    ContaAppComponent,
    RegisterComponent,
    LoginComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AccountRoutingModule
  ],
  providers: [
    AccountService,
    AccountGuard
  ]
})
export class AccountModule { }
