import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { StoreService } from 'src/app/services/index.service';
import { GetCategoryDTO } from 'src/app/dtos/dtos.module';
import { SpinnerCommon } from 'src/app/shared/commons/spinner.common';
import { AlertCommon } from 'src/app/shared/commons/alert.common';

@Component({
  selector: 'app-new-category',
  templateUrl: './new-category.component.html',
  styleUrls: ['./new-category.component.scss'],
})
export class NewCategoryComponent implements OnInit {

  category = new FormControl(null, Validators.required);

  constructor(
    private route: Router,
    private store: StoreService,
    private spinner: SpinnerCommon,
    private alert: AlertCommon
  ) {
  }

  ngOnInit() { }

  backStore = () => this.route.navigate(['/store'])

  register = (category: HTMLInputElement) => {
    this.spinner.loadingAuth('Registrando...')
    this.category.setValue(category.value);
    if (!this.category.invalid) {
      const newFormatForm: GetCategoryDTO = {
        name: this.category.value
      }
      this.store.newCategory(newFormatForm)
        .then(
          () => {
            setTimeout(() => {
              this.spinner.dismissAuth();
              this.alert.successAlert('Registrado', 'Registrado la categoria correctamente');
              this.route.navigate(['/store'])
            }, 2000)
          }
        )
        .catch(() => {
          setTimeout(() => {
            this.spinner.dismissAuth();
            this.alert.conectionError();
          }, 2000)
        })
    } else {
      setTimeout(() => {
        this.spinner.dismissAuth();
        this.alert.invalidFormAlert('Formulario inválido', 'Verifique bien los datos del formulario')
      }, 1000)
    }
  }

  refresh = () => document.location.href = document.location.href;
}
