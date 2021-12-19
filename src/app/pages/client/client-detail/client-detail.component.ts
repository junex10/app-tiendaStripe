import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ClientService } from 'src/app/services/index.service';
import { AlertCommon } from 'src/app/shared/commons/alert.common';
import { SpinnerCommon } from 'src/app/shared/commons/spinner.common';
import { ToastCommon } from 'src/app/shared/commons/toast.common';

import {
  GetUserDTO,
  NewClientDTO,
  EditPersonDTO,
  UpdateEmailDTO,
  UpdateNamesDTO,
  UpdatePhoneDTO
} from 'src/app/dtos/dtos.module';

@Component({
  selector: 'app-client-detail',
  templateUrl: './client-detail.component.html',
  styleUrls: ['./client-detail.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class ClientDetailComponent implements OnInit {

  imageProfile: string = 'assets/icon/undraw_profile.svg';
  editing: boolean = false;

  form: FormGroup;

  email: string;
  name: string;
  lastname: string;
  phone: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private client: ClientService,
    private alert: AlertCommon,
    private toast: ToastCommon,
    private spinner: SpinnerCommon
  ) {
    this.form = this.fb.group({
      name: [null, Validators.required],
      lastname: [null, Validators.required],
      phone: [null, Validators.required],
      areaCode: ['+58', Validators.required],
      email: [null, [
        Validators.required,
        Validators.email
      ]]
    })
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.getUserData(params.id)
    })
  }

  edit = () => this.editing === false ? this.editing = true : this.editing = false;

  selectAreaCode = ($event: HTMLSelectElement) => this.form.get('areaCode').setValue($event.value)

  sendForm = (
    email: HTMLInputElement,
    name: HTMLInputElement,
    lastname: HTMLInputElement,
    phone: HTMLInputElement
  ) => {
    this.spinner.loadingAuth('Actualizando...');
    this.form.get('email').setValue(email.value);
    this.form.get('name').setValue(name.value);
    this.form.get('lastname').setValue(lastname.value);
    this.form.get('phone').setValue(phone.value);
    if (!this.form.invalid) {
      this.client.updateEmail({ email: this.email, newEmail: this.getEmail })
        .then(
          () => {
            this.toast.successToast('', 'Email actualizado', 'bottom')
            this.client.updateNames({ email: this.getEmail, name: this.getName, lastname: this.getLastname })
              .then(
                () => {
                  this.toast.successToast('', 'Nombres actualizado', 'bottom')
                  this.client.updatePhone({ email: this.getEmail, phone: this.getPhone, areaCode: this.getAreaCode })
                    .then(
                      () => {
                        setTimeout(() => {
                          this.spinner.dismissAuth();
                          this.toast.successToast('', 'Teléfono actualizado', 'bottom');
                          this.alert.successAlert('Actualizado!', 'Se ha actualizado al usuario!');
                          
                          this.editing = false;

                          this.email = this.getEmail;
                          this.phone = `${this.getAreaCode} ${this.getPhone}`;
                          this.name = this.getName;
                          this.lastname = this.getLastname;
                        }, 3000)
                      }
                    )
                    .catch(() => {
                      setTimeout(() => {
                        this.spinner.dismissAuth();
                        this.alert.conectionError()
                      }, 3000)
                    })
                }
              )
              .catch(() => {
                setTimeout(() => {
                  this.spinner.dismissAuth();
                  this.alert.conectionError()
                }, 3000)
              })
          }
        )
        .catch(() => {
          setTimeout(() => {
            this.spinner.dismissAuth();
            this.alert.conectionError()
          }, 3000)
        })
    }
  }

  getUserData = (id: string) => {
    this.client.getClientById(id).subscribe(
      data => {
        this.form.get('name').setValue(data.person.name);
        this.form.get('lastname').setValue(data.person.lastname);
        this.form.get('email').setValue(data.email);
        this.form.get('phone').setValue(data.person.phone);
        this.form.get('areaCode').setValue(data.person.areaCode);

        this.email = data.email;
        this.name = data.person.name;
        this.lastname = data.person.lastname;
        this.phone = `${data.person.areaCode} ${data.person.phone}`;
      }
    )
  }

  refresh = () => document.location.href = document.location.href;

  get getEmail() { return this.form.get('email').value }
  get getName() { return this.form.get('name').value }
  get getLastname() { return this.form.get('lastname').value }
  get getPhone() { return this.form.get('phone').value }
  get getAreaCode() { return this.form.get('areaCode').value }

}
