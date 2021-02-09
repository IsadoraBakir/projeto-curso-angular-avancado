import { Component, OnInit, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControlName, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { Observable, fromEvent, merge } from 'rxjs';

import { ToastrService } from 'ngx-toastr';

import { ValidationMessages, GenericValidator, DisplayMessage } from 'src/app/utils/generic-form-validation';
import { Supplier } from '../models/supplier';
import { Endereco } from '../models/endereco';
import { SupplierService } from '../services/supplier.service';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html'
})
export class EditarComponent implements OnInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  errors: any[] = [];
  errorsEndereco: any[] = [];
  supplierForm: FormGroup;
  enderecoForm: FormGroup;

  supplier: Supplier = new Supplier();
  endereco: Endereco = new Endereco();

  validationMessages: ValidationMessages;
  genericValidator: GenericValidator;
  displayMessage: DisplayMessage = {};
  textoDocumento = '';

  tipoSupplier: number;
  formResult = '';

  mudancasNaoSalvas: boolean;

  constructor(
    private fb: FormBuilder,
    private supplierService: SupplierService,
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute) {

    this.validationMessages = {
      nome: {
        required: 'Informe o Nome',
      },
      documento: {
        required: 'Informe o Documento'
      },
      logradouro: {
        required: 'Informe o Logradouro',
      },
      numero: {
        required: 'Informe o Número',
      },
      bairro: {
        required: 'Informe o Bairro',
      },
      cep: {
        required: 'Informe o CEP'
      },
      cidade: {
        required: 'Informe a Cidade',
      },
      estado: {
        required: 'Informe o Estado',
      }
    };

    this.genericValidator = new GenericValidator(this.validationMessages);

    this.supplierService.obterPorId(route.params['id'])
      .subscribe(supplier => this.supplier = supplier);
  }

  ngOnInit() {

    this.supplierForm = this.fb.group({
      id: '',
      nome: ['', [Validators.required]],
      documento: '',
      ativo: ['', [Validators.required]],
      tipoSupplier: ['', [Validators.required]]
    });

    this.enderecoForm = this.fb.group({
      id: '',
      logradouro: ['', [Validators.required]],
      numero: ['', [Validators.required]],
      complemento: [''],
      bairro: ['', [Validators.required]],
      cep: ['', [Validators.required]],
      cidade: ['', [Validators.required]],
      estado: ['', [Validators.required]],
      supplierId: ''
    });
  }

  ngAfterViewInit() {
    let controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    merge(...controlBlurs).subscribe(() => {
      this.displayMessage = this.genericValidator.processMessages(this.supplierForm);
      this.mudancasNaoSalvas = true;
    });
  }

  editSupplier() {
    if (this.supplierForm.dirty && this.supplierForm.valid) {

      this.supplier = Object.assign({}, this.supplier, this.supplierForm.value);

      this.supplierService.atualizarSupplier(this.supplier)
        .subscribe(
          sucesso => { this.processarSucesso(sucesso) },
          falha => { this.processarFalha(falha) }
        );

      this.mudancasNaoSalvas = false;
    }
  }

  processarSucesso(response: any) {
    this.errors = [];

    let toast = this.toastr.success('Supplier atualizado com sucesso!', 'Sucesso!');
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.router.navigate(['/suppliers/listar-todos']);
      });
    }
  }

  processarFalha(fail: any) {
    this.errors = fail.error.errors;
    this.toastr.error('Ocorreu um erro!', 'Opa :(');
  }
}
