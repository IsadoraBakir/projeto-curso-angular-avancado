import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SupplierAppComponent } from './supplier.app.component';
import { NovoComponent } from './novo/novo.component';
import { ListaComponent } from './lista/lista.component';
import { EditarComponent } from './editar/editar.component';
import { DetalhesComponent } from './detalhes/detalhes.component';
import { ExcluirComponent } from './excluir/excluir.component';

const supplierRouterConfig: Routes = [
    {
        path: '', component: SupplierAppComponent,
        children: [
            { path: 'listar-todos', component: ListaComponent },
            { path: 'adicionar-novo', component: NovoComponent },
            { path: 'editar/:id', component: EditarComponent },
            { path: 'detalhes/:id', component: DetalhesComponent },
            { path: 'excluir/:id', component: ExcluirComponent }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(supplierRouterConfig)
    ],
    exports: [RouterModule]
})
export class SupplierRoutingModule { }
