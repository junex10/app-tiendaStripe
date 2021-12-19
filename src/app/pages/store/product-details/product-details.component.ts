import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StoreService } from 'src/app/services/index.service';
import { AlertCommon } from 'src/app/shared/commons/alert.common';
import { SpinnerCommon } from 'src/app/shared/commons/spinner.common';
import * as moment from 'moment';
import {
  GetCategoryDTO,
  UpdateStockDTO
} from 'src/app/dtos/dtos.module';
import { ModalController } from '@ionic/angular';
import { CameraComponent } from 'src/app/shared/camera/camera.component';
import { ToastCommon } from 'src/app/shared/commons/toast.common';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class ProductDetailsComponent implements OnInit {

  editing: boolean = false;
  priceOpen: boolean = true;
  stockOpen: boolean = false;
  categoryOpen: boolean = false;

  image: string = "assets/icon/undraw_profile.svg";
  productName: string;
  stockV: string;
  priceV: string;
  categoryV: string;
  time: string;

  form: FormGroup;

  categorys: GetCategoryDTO[] = [];

  constructor(
    private route: ActivatedRoute,
    private store: StoreService,
    private alert: AlertCommon,
    private spinner: SpinnerCommon,
    private router: Router,
    private fb: FormBuilder,
    private modal: ModalController,
    private toast: ToastCommon
  ) {
    this.form = this.fb.group({
      price: [null, Validators.required],
      stock: [null, Validators.required],
      category: [null, Validators.required],
      product: [null, Validators.required],
      id: [null, Validators.required],
      image: [null,]
    })
   }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.getProductByProduct(params.product);
      this.getCategorys()
    })
  }

  edit = () => this.editing === false ? this.editing = true : this.editing = false;

  selectTab = (tab: string, self: HTMLDivElement) => {
    const tabs = document.getElementsByClassName('tab');
    for (let i = 0; i < tabs.length; i++) {
      tabs[i].classList.remove('actived');
    }
    self.classList.add('actived');
    switch(tab) {
      case 'price':
        this.priceOpen = true;
        this.stockOpen = false;
        this.categoryOpen = false;
      break;
      case 'stock':
        this.priceOpen = false;
        this.stockOpen = true;
        this.categoryOpen = false;
      break;
      case 'category':
        this.priceOpen = false;
        this.stockOpen = false;
        this.categoryOpen = true;
      break;
    }
  }

  getProductByProduct = (product: string) => {
    this.store.getProductByProduct(product)
      .subscribe(
        value => {
          this.productName = value.product;
          this.priceV = new Intl.NumberFormat().format(value.price);
          this.stockV = new Intl.NumberFormat().format(value.stock);
          this.image = value.image;
          this.form.get('image').setValue(value.image);
          this.categoryV = value.category;
          this.time = moment(value.createDate).format('DD/MM/YYYY H:M A');
          this.form.get('id').setValue(value.id);
        },
        () => {
          this.alert.conectionError();
          this.router.navigate(['/store']);
        }
      )
  }

  getCategorys = () => {
    this.store.getCategorys()
      .subscribe(
        val => val.map(x => x.name !== this.categoryV && x.name !== 'Sin filtros' ? this.categorys.push(x): null)
      )
  }

  selectCat = ($event: HTMLSelectElement) => this.form.get('category').setValue($event.value);

  sendForm = (
    priceForm: HTMLInputElement,
    stockForm: HTMLInputElement,
    categoryForm: HTMLInputElement,
    productForm: HTMLInputElement
  ) => {
    this.spinner.loadingAuth('Cargando...');
    this.form.get('product').setValue(productForm.value);
    this.form.get('price').setValue(priceForm.value);
    this.form.get('stock').setValue(stockForm.value);
    this.form.get('category').setValue(categoryForm.value);

    if (!this.form.invalid) {
      const newForm: UpdateStockDTO = {
        product: this.product,
        id: this.id,
        price: this.price,
        stock: this.stock,
        category: this.category,
        image: this.image
      };
      this.store.updateStock(newForm)
        .then(
          () => {
            setTimeout(() => {
              this.spinner.dismissAuth();
              this.alert.successAlert('Actualizado', 'Se ha actualizado sastifactoriamente el producto');
              this.router.navigate(['/store'])
            }, 3000);
          }
        )
        .catch(() => {
          setTimeout(() => {
            this.spinner.dismissAuth();
            this.alert.conectionError();
          }, 3000)
        })
    }
  }

  camera = async() => {
    const modal = await this.modal.create({
      component: CameraComponent,
      componentProps: {
        image: this.getImage
      }
    });
    modal.onDidDismiss()
      .then(image => {
        this.form.get('image').setValue(image.data.result);
        this.image = image.data.result;
        this.toast.successToast('', 'Imagen guardada');
      })
    return await modal.present();
  }

  refresh = () => document.location.href = document.location.href;

  get product() { return this.form.get('product').value; }
  get category() { return this.form.get('category').value; }
  get price() { return this.form.get('price').value; }
  get stock() { return this.form.get('stock').value; }
  get id() { return this.form.get('id').value; }
  get getImage() { return this.form.get('image').value; }
}
