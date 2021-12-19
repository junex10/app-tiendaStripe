import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from 'src/app/services/index.service';

@Injectable({
  providedIn: 'root'
})
export class ClientGuard implements CanActivate {
  constructor(
    private router: Router,
    private login: LoginService
  ){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return new Promise((resolve, reject) => {
      const session = this.login.getSession();
      if (session === null) {
        resolve(false);
        this.router.navigate(['/'])
      } else {
        this.login.authUserAccess(session.token)
        .then(value => {
          if (value.permits.name === 'Administrador') resolve(true)
          else {
            let count = 0;
            value.permits.keys.map((val: any) => {
              if (val.name === 'management') {
                val.control.map(x => {
                  if (x === 'clients') {
                    count = 1
                  }
                })
              } 
            });
            if (count == 1) resolve(true)
            else {
              resolve(false);
              this.login.logout();
            }
          }
        })
      }
    })
  }
  
}
