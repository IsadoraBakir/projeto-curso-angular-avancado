import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChildren } from '@angular/core';
import { AbstractControl, FormBuilder, FormControlName, FormGroup, ValidationErrors, Validators } from '@angular/forms';

import { Observable, merge, Subscription, fromEvent } from 'rxjs';

import { ValidationMessages, GenericValidator, DisplayMessage } from './../../utils/generic-form-validation';
import { AccountService } from './../services/account.service';
import { User } from './../models/user';
import { Router } from '@angular/router';
import { debug } from 'console';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  subscriptions: Subscription[] = [];
  errors: any[] = [];
  registerForm: FormGroup;
  user: User;

  validationMessages: ValidationMessages;
  genericValidator: GenericValidator;
  displayMessage: DisplayMessage = {};

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private accountService: AccountService) {

    this.validationMessages = {
      email: {
        required: 'Informe o e-mail',
        email: 'Email inválido'
      },
      password: {
        required: 'Informe a senha',
        rangeLength: 'A senha deve possuir entre 6 e 15 caracteres'
      },
      confirmPassword: {
        required: 'Informe a senha novamente',
        rangeLength: 'A senha deve possuir entre 6 e 15 caracteres',
        equalTo: 'As senhas não conferem'
      }
    };

    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [undefined, [Validators.required]],
      confirmPassword: [undefined, [Validators.required, this.matchValues('password')]]
    });
  }

  ngAfterViewInit(): void {
    const controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    merge(...controlBlurs).subscribe(() => {
      this.displayMessage = this.genericValidator.processMessages(this.registerForm);
    });
  }

  matchValues(
    matchTo: string
  ): (AbstractControl) => ValidationErrors | null {
    return (control: AbstractControl): ValidationErrors | null => {
      return !!control.parent &&
        !!control.parent.value &&
        control.value === control.parent.controls[matchTo].value
        ? null
        : { isMatching: false };
    };
  }

  addAccount() {
    if (this.registerForm.dirty && this.registerForm.valid) {
      this.user = Object.assign({}, this.user, this.registerForm.value);
      this.subscriptions.push(
        this.accountService.registerUser(this.user)
          .subscribe(
            success => { this.processSuccess(success); },
            fail => { this.processFails(fail); }
          )
      );
    }
  }

  processSuccess(response: any) {
    this.registerForm.reset();
    this.errors = [];
    this.accountService.LocalStorage.saveLocalDataUser(response);
    this.router.navigate(['/home']);
  }

  processFails(fail: any) {
    this.errors = fail.error.errors;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
