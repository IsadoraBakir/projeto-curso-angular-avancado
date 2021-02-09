import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { BaseService } from 'src/app/services/base.service';
import { Supplier } from '../models/supplier';

@Injectable()
export class SupplierService extends BaseService {

    supplier: Supplier = new Supplier();

    constructor(private http: HttpClient) {
        super();

        this.supplier.name = 'Teste Fake';
        this.supplier.document = '32165498754';
        this.supplier.active = true;
        this.supplier.supplierType = 1;
    }

    obterTodos(): Observable<Supplier[]> {
        return this.http
            .get<Supplier[]>(this.UrlServiceV1 + 'suppliers')
            .pipe(catchError(super.serviceError));
    }

    obterPorId(id: string): Observable<Supplier> {
        return new Observable<Supplier>();
    }

    novoSupplier(supplier: Supplier): Observable<Supplier> {
        return new Observable<Supplier>();
    }

    atualizarSupplier(supplier: Supplier): Observable<Supplier> {
        return new Observable<Supplier>();
    }

    excluirSupplier(id: string): Observable<Supplier> {
        return new Observable<Supplier>();
    }
}
