import { Component, OnInit, Input } from '@angular/core';
import { MenuController } from '@ionic/angular';
import {
  ACTIONS_STORE,
  ACTIONS_CLIENT
} from 'src/app/shared/commons/actions.common';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {

  @Input('section') section: string = '';
  @Input('title') title: string = 'Tienda';
  actualPage: string = 'Acciones';

  public selectedIndex = 0;
  public appOptions = [];

  constructor(
    private menu: MenuController
  ) { }

  ngOnInit(): void {
    switch(this.section) {
      case 'store':
        this.appOptions = ACTIONS_STORE;
        this.title = 'Tienda';
      break;
      case 'client':
        this.appOptions = ACTIONS_CLIENT;
        this.title = 'Clientes';
      break;
    }
  }

  openMenu = () => this.menu.open()
}
