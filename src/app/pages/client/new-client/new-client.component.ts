import { Component, OnInit } from '@angular/core';
import { USER_TYPE } from 'src/app/shared/commons/config';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { NewClientDTO } from 'src/app/dtos/dtos.module';
import { ClientService } from 'src/app/services/index.service';
import { AlertCommon } from 'src/app/shared/commons/alert.common';
import { SpinnerCommon } from 'src/app/shared/commons/spinner.common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-client',
  templateUrl: './new-client.component.html',
  styleUrls: ['./new-client.component.scss'],
})
export class NewClientComponent implements OnInit {

  roles: string[] = USER_TYPE;
  form: FormGroup;
  formSend: NewClientDTO;

  constructor(
    private fb: FormBuilder,
    private client: ClientService,
    private alert: AlertCommon,
    private spinner: SpinnerCommon,
    private route: Router
  ) {
    this.form = this.fb.group({
      email: [null, [
        Validators.required,
        Validators.email
      ]],
      password: [null, [
        Validators.required,
        /*Validators.pattern(/^\S+$/),
        Validators.pattern(/\.*[A-Z]/),
        Validators.pattern(/\.*[0-9]/),
        Validators.min(4),
        Validators.max(10)*/
      ]],
      userType: ['Gerente', Validators.required],
      name: [null, Validators.required],
      lastname: [null, Validators.required],
      areaCode: ['+58', Validators.required],
      phone: [null, [
        Validators.required,
        Validators.min(8)
      ]]
    })
  }

  ngOnInit(): void { }

  selectRole = ($event: HTMLSelectElement) => this.form.get('userType').setValue($event.value);
  selectAreaCode = ($event: HTMLSelectElement) => this.form.get('areaCode').setValue($event.value);

  register = (
    email: HTMLInputElement,
    password: HTMLInputElement,
    name: HTMLInputElement,
    lastname: HTMLInputElement,
    phone: HTMLInputElement
  ) => {
    this.spinner.loadingAuth('Registrando...');
    this.form.get('email').setValue(email.value);
    this.form.get('password').setValue(password.value);
    this.form.get('name').setValue(name.value);
    this.form.get('lastname').setValue(lastname.value);
    this.form.get('phone').setValue(phone.value);

    if (!this.form.invalid) {
      this.formSend = {
        email: this.email,
        password: this.password,
        repeat_password: this.password,
        userType: this.userType,
        person: {
          name: this.name,
          lastname: this.lastname,
          areaCode: this.areaCode,
          phone: this.phone
        }
      };
      this.client.newClient(this.formSend)
        .then(
          () => {
            setTimeout(() => {
              this.spinner.dismissAuth();
              this.alert.successAlert('Registrado', `Se ha registrado el cliente`);
              this.route.navigate(['/client']);
            }, 2000)
          }
        )
        .catch(() => {
          setTimeout(() => {
            this.spinner.dismissAuth();
            this.alert.conectionError();
          }, 2000);
        })
    } else {
      setTimeout(() => {
        this.spinner.dismissAuth();
        this.alert.invalidFormAlert('Formulario inválido', 'Verifique bien los datos del formulario')
      }, 1000)
    }
  }

  refresh = () => document.location.href = document.location.href;

  get email() { return this.form.get('email').value; }
  get password() { return this.form.get('password').value; }
  get name() { return this.form.get('name').value; }
  get lastname() { return this.form.get('lastname').value; }
  get phone() { return this.form.get('phone').value; }
  get userType() { return this.form.get('userType').value; }
  get areaCode() { return this.form.get('areaCode').value; }
}
