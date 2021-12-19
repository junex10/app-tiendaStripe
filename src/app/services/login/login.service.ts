import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { 
  LoginDTO, 
  JWTAUTHDTO 
} from 'src/app/dtos/dtos.module';
import { HTTP_OPTIONS, URL_SERVICIOS } from 'src/app/shared/commons/config';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  usersModule: string = `${URL_SERVICIOS}users/`;

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  public AuthUser = (form: LoginDTO) => 
    this.http.post<JWTAUTHDTO>(`${this.usersModule}auth`, form);
  
  public createSession = (user: JWTAUTHDTO) => 
    window.sessionStorage.setItem('user', JSON.stringify(user))
  
  public authLogin = () => window.sessionStorage.getItem('user') !== null ? this.router.navigate(['/store']) : null;

  public getSession = () => JSON.parse(window.sessionStorage.getItem('user'));

  public authUserAccess = (token: string): Promise<any> => {
    return new Promise((resolve, reject) => {
      this.descryptToken(token)
      .then(value => resolve(value))
    })
  }
  private descryptToken = (token: string) => 
    this.http.post<any>(`${this.usersModule}getDecodeToken`, { token: token }, HTTP_OPTIONS).toPromise()
  
  public logout = () => {
    window.sessionStorage.removeItem('user');
    this.router.navigate(['/'])
  }
}
