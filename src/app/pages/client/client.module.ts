import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TabsComponent } from 'src/app/shared/tabs/tabs.component';
import { ClientDetailComponent } from './client-detail/client-detail.component';
import { NewClientComponent } from './new-client/new-client.component';
import { ClientGuard } from 'src/app/guard/index.guard';

const routes: Routes = [
  {
    path: '',
    component: TabsComponent,
    canActivate: [ClientGuard]
  },
  {
    path: 'client-detail/:id',
    component: ClientDetailComponent,
    canActivate: [ClientGuard]
  },
  {
    path: 'new-client',
    component: NewClientComponent,
    canActivate: [ClientGuard]
  }
]

@NgModule({
  declarations: [
    NewClientComponent,
    ClientDetailComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class ClientModule { }
