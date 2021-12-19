import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { TabsComponent } from 'src/app/shared/tabs/tabs.component';
import { IonicModule } from '@ionic/angular';
import { StoreGuard } from 'src/app/guard/index.guard';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { NewProductComponent } from './new-product/new-product.component';
import { NewCategoryComponent } from './new-category/new-category.component';

const routes: Routes = [
  {
    path: '',
    component: TabsComponent,
    canActivate: [StoreGuard]
  },
  {
    path: 'product/details/:id',
    component: ProductDetailsComponent,
    canActivate: [StoreGuard]
  },
  {
    path: 'product/new-product',
    component: NewProductComponent,
    canActivate: [StoreGuard]
  },
  {
    path: 'category/new-category',
    component: NewCategoryComponent,
    canActivate: [StoreGuard]
  },
  {
    path: 'product/product-detail/:product',
    component: ProductDetailsComponent,
    canActivate: [StoreGuard]
  }
];
@NgModule({
  declarations: [
    NewCategoryComponent,
    NewProductComponent,
    ProductDetailsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    IonicModule
  ]
})
export class StoreModule { }
