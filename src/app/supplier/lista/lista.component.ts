import { Component, OnInit } from '@angular/core';
import { SupplierService } from '../services/supplier.service';
import { Supplier } from '../models/supplier';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html'
})
export class ListaComponent implements OnInit {

  public suppliers: Supplier[];
  errorMessage: string;

  constructor(private supplierService: SupplierService) { }

  ngOnInit(): void {
    this.supplierService.obterTodos()
      .subscribe(
        suppliers => this.suppliers = suppliers,
        error => this.errorMessage);
  }
}
