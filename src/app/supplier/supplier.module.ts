import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NovoComponent } from './novo/novo.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SupplierRoutingModule } from './supplier.route';
import { SupplierAppComponent } from './supplier.app.component';
import { ListaComponent } from './lista/lista.component';
import { SupplierService } from './services/supplier.service';

import { EditarComponent } from './editar/editar.component';
import { ExcluirComponent } from './excluir/excluir.component';
import { DetalhesComponent } from './detalhes/detalhes.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    SupplierAppComponent,
    NovoComponent,
    ListaComponent,
    EditarComponent,
    ExcluirComponent,
    DetalhesComponent
  ],
  imports: [
    CommonModule,
    SupplierRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    SupplierService
  ]
})
export class SupplierModule { }
