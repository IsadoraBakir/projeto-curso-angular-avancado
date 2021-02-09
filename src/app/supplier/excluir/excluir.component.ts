import { Component } from '@angular/core';
import { Supplier } from '../models/supplier';

import { ActivatedRoute, Router } from '@angular/router';
import { SupplierService } from '../services/supplier.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-excluir',
  templateUrl: './excluir.component.html'
})
export class ExcluirComponent {

  supplier: Supplier = new Supplier();

  constructor(
    private supplierService: SupplierService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService) {

    // tslint:disable-next-line: no-string-literal
    this.supplierService.obterPorId(route.params['id'])
      .subscribe(supplier => this.supplier = supplier);
  }

  excluirEvento() {
    this.supplierService.excluirSupplier(this.supplier.id)
      .subscribe(
        evento => { this.sucessoExclusao(evento) },
        error => { this.falha() }
      );
  }

  sucessoExclusao(evento: any) {

    const toast = this.toastr.success('Supplier excluido com Sucesso!', 'Good bye :D');
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.router.navigate(['/suppliers/listar-todos']);
      });
    }
  }

  falha() {
    this.toastr.error('Houve um erro no processamento!', 'Ops! :(');
  }
}
