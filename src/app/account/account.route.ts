import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ContaAppComponent } from './account.app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const contaRouterConfig: Routes = [
    {
        path: '', component: ContaAppComponent,
        children: [
            { path: 'register', component: RegisterComponent },
            { path: 'login', component: LoginComponent }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(contaRouterConfig)
    ],
    exports: [RouterModule]
})
export class AccountRoutingModule { }
