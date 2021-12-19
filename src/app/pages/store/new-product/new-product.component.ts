import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  GetCategoryDTO, RegisterStockDTO
} from 'src/app/dtos/dtos.module';
import { StoreService } from 'src/app/services/index.service';
import { AlertCommon } from 'src/app/shared/commons/alert.common';
import { ModalController } from '@ionic/angular';
import { CameraComponent } from 'src/app/shared/camera/camera.component';
import { ToastCommon } from 'src/app/shared/commons/toast.common';
import { SpinnerCommon } from 'src/app/shared/commons/spinner.common';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})

export class NewProductComponent implements OnInit {

  tempImg: string;
  activedCamera: boolean = false;
  category: GetCategoryDTO[] = [];
  form: FormGroup;
  formatRegister: RegisterStockDTO;

  constructor(
    private route: Router,
    private store: StoreService,
    private alert: AlertCommon,
    private fb: FormBuilder,
    public modal: ModalController,
    private toast: ToastCommon,
    private spinner: SpinnerCommon
  ) {
    this.form = this.fb.group({
      product: [null, Validators.required],
      price: [null, Validators.required],
      stock: [null, Validators.required],
      image: ['assets/img/box.jpg', Validators.required],
      category: [null, Validators.required]
    })
  }

  ngOnInit() {
    this.getCategory();
  }

  backStore = () => this.route.navigate(['/store'])

  getCategory = () => {
    this.store.getCategorys()
      .subscribe(
        value => {
          let newValues: GetCategoryDTO[] = [];
          value.map(x => x.name !== 'Sin filtros' ? newValues.push(x) : null);
          this.category = newValues;
          this.form.get('category').setValue(this.category[0].name)
        },
        () => {
          this.alert.alertPersonalized(
            'connectionError',
            'Error de conexión',
            'Hay un problema de conexión, verifique que su conexión a internet sea estable',
            ['Entendido']
          );
        }
      )
  }
  selectCat = ($event: any) => this.form.get('category').setValue($event.target.value)
  choosePhoto = () => {
    this.presentModal()
  }
  async presentModal() {
    const modal = await this.modal.create({
      component: CameraComponent,
      componentProps: {
        image: this.form.get('image').value
      }
    });
    modal.onDidDismiss()
      .then(image => {
        this.form.get('image').setValue(image.data.result);
        this.toast.successToast('', 'Imagen guardada');
      })
    return await modal.present();
  }
  register = (
    product: HTMLInputElement,
    price: HTMLInputElement,
    stock: HTMLInputElement
  ) => {
    this.spinner.loadingAuth('Registrando...');
    this.form.get('product').setValue(product.value);
    this.form.get('price').setValue(price.value);
    this.form.get('stock').setValue(stock.value);

    if (this.form.get('category').value !== 'Sin filtros' && !this.form.invalid) {
      this.formatRegister = {
        product: this.form.get('product').value,
        price: Number(this.form.get('price').value),
        stock: Number(this.form.get('stock').value),
        category: this.form.get('category').value,
        image: this.form.get('image').value
      };
      this.store.registerStock(this.formatRegister)
        .then(
          (d) => {
            setTimeout(() => {
              this.spinner.dismissAuth();
              this.alert.successAlert('Registrado!', 'Nuevo producto registrado sastifactoriamente');
              this.route.navigate(['/store']);
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
        this.spinner.dismissAuth()
        this.alert.invalidFormAlert('Error', 'Debe completar los campos')
      }, 1000)
    }
  }
  refresh = () => document.location.href = document.location.href;
}
