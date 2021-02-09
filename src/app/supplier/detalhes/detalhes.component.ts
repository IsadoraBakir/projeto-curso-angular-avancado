import { Component } from '@angular/core';
import { Supplier } from '../models/supplier';

import { ActivatedRoute } from '@angular/router';
import { SupplierService } from '../services/supplier.service';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html'
})
export class DetalhesComponent {

  supplier: Supplier = new Supplier();

  constructor(
    private route: ActivatedRoute,
    private supplierService: SupplierService) {

      // tslint:disable-next-line: no-string-literal
      this.supplierService.obterPorId(route.params['id'])
      .subscribe(supplier => this.supplier = supplier);
  }
}
