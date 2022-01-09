import { environment } from 'src/environments/environment.prod';
import { HttpHeaders } from '@angular/common/http';

export const URL_SERVICIOS = environment.baseUrl;
export const authorization = JSON.parse(window.sessionStorage.getItem('user'));
export const HTTP_OPTIONS = { 
    headers: new HttpHeaders({ 
        'Accept': 'application/json', 
        'authorization': authorization === null ? '' : authorization.token 
    })
};
export const HTTP_OPTIONS_NATIVE = {
    'Accept': 'application/json', 
    'authorization': authorization === null ? '' : authorization.token
}
export const USER_TYPE = ['Gerente', 'Usuario']; 