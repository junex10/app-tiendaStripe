import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/index.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
})
export class TabsComponent implements OnInit {

  section: string;
  tab: boolean = false;

  constructor(
    private route: Router,
    private login: LoginService
  ) { 
    
  }

  ngOnInit() {
    this.section = this.route.url.replace('/', '');
  }

  switchTab = () => this.tab === false ? this.tab = true : this.tab = false;

  closeSession = () => this.login.logout()

}
