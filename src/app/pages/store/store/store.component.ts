import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { StoreService } from 'src/app/services/index.service';
import { 
  GetStockByCategoryDTO,
  GetCategoryDTO
} from 'src/app/dtos/dtos.module';
import { AlertCommon } from 'src/app/shared/commons/alert.common';
import { FormControl, Validators } from '@angular/forms';
import { IonSearchbar } from '@ionic/angular';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class StoreComponent implements OnInit {

  products: GetStockByCategoryDTO[] = [];
  bar: boolean = true;
  categorys: GetCategoryDTO[] = [];
  actualCategory = new FormControl('Sin filtros', Validators.required);
  @ViewChild('searchbar') searchBar: IonSearchbar;

  constructor(
    private store: StoreService,
    private alert: AlertCommon
  ) {
  }

  ngOnInit(): void {
    this.getProductsByCategory(this.actualCategory.value);
    this.getCategorys();
  }

  buscar = (event: CustomEvent) => {
    let { value } = event.detail;
    let busqueda = this.products;

    if (value.length === 0) {
      return this.getProductsByCategory(this.actualCategory.value);
    }

    value = value.toLocaleLowerCase();

    let find = busqueda.filter(c => {
      let item = c.product.toLocaleLowerCase();
      return item.includes(value);
    });

    this.products = find;
  }
  toggleBar = () => this.bar == true ? this.bar = false : this.bar = true

  getCategorys = () =>
    this.store.getCategorys()
      .subscribe(
        value => this.categorys = value,
        () => {
          this.alert.alertPersonalized(
            'connectionError',
            'Error de conexión',
            'Hay un problema de conexión, verifique que su conexión a internet sea estable',
            ['Entendido']
          );
        }
      )
  getProductsByCategory = (category: string) =>
    this.store.getProductsByCategory(category)
      .subscribe(
        products => {
          this.products = products;
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
  selectCategory = (event: CustomEvent) => {
    this.searchBar.value = '';
    const { value } = event.detail;
    this.actualCategory.setValue(value);
    this.getProductsByCategory(this.actualCategory.value);
  }

  refresh = () => document.location.href = document.location.href;
}
