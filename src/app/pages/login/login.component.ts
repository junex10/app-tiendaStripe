import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { LoginService } from 'src/app/services/login/login.service';
import { SpinnerCommon } from 'src/app/shared/commons/spinner.common';
import { AlertCommon } from 'src/app/shared/commons/alert.common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private spinner: SpinnerCommon,
    private alert: AlertCommon,
    private router: Router
  ) { 
    this.form = this.fb.group({
      email: new FormControl(null, { validators: Validators.required }),
      password: new FormControl(null, { validators: Validators.required })
    })
  }
  ngOnInit() {
    this.loginService.authLogin();
  }

  login(email: HTMLInputElement, password: HTMLInputElement) {
    this.spinner.loadingAuth('Validando usuario...');
    this.form.get('email').setValue(email.value);
    this.form.get('password').setValue(password.value);
    if (!this.form.invalid) {
      this.loginService.AuthUser(this.form.value)
      .subscribe(
        value => {
          this.spinner.dismissAuth();
          this.loginService.createSession(value);
          this.router.navigate(['/store']);
        },
        () => {
          this.spinner.dismissAuth();
          this.alert.conectionError()
        }
      )
    } else {
      this.alert.invalidFormAlert('Formulario inválido', `<div class='row mt-4'>
        ${this.form.get('email').invalid ? `<h6 class='col-12'>El campo usuario es inválido</h6>` : ''}
        ${this.form.get('password').invalid ? `<h6 class='col-12'>El campo contraseña es inválido</h6>` : ''}
      </div>`)
    }
  }
 
}
