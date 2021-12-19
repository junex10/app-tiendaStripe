import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsComponent } from '../shared/tabs/tabs.component';
import { StoreModule } from './store/store.module';
import { ClientModule } from './client/client.module';
import { SidebarComponent } from '../shared/sidebar/sidebar.component';
import { IonicModule } from '@ionic/angular';
import { AppRoutingModule } from '../app-routing.module';

import { StoreComponent } from './store/store/store.component';
import { ClientComponent } from './client/client/client.component';

@NgModule({
  declarations: [
    TabsComponent,
    SidebarComponent,
    StoreComponent,
    ClientComponent
  ],
  imports: [
    CommonModule,
    StoreModule,
    ClientModule,
    IonicModule,
    AppRoutingModule
  ],
})
export class PagesModule { }
