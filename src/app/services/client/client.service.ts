import { Injectable } from '@angular/core';
import { Http } from '@capacitor-community/http';
import { HTTP_OPTIONS, URL_SERVICIOS, HTTP_OPTIONS_NATIVE } from 'src/app/shared/commons/config';
import { 
  NewClientDTO,
  UpdateEmailDTO,
  UpdateNamesDTO,
  UpdatePhoneDTO,
  GetUserDTO
} from 'src/app/dtos/dtos.module';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  users: string = `${URL_SERVICIOS}users/`;

  constructor(
    private httpClient: HttpClient
  ) { }

  public getClients = () => 
    this.httpClient.get<GetUserDTO[]>(`${this.users}getUsers`)

  public newClient = (form: NewClientDTO) => 
    Http.post({ url: `${this.users}registerUser`, headers: { ...HTTP_OPTIONS_NATIVE }, data: form })
  
  public updatePhone = (form: UpdatePhoneDTO) => 
    Http.put({ url: `${this.users}update/phone`, headers: { ...HTTP_OPTIONS_NATIVE }, data: form })
  
  public updateNames = (form: UpdateNamesDTO) => 
    Http.put({ url: `${this.users}update/names`, headers: { ...HTTP_OPTIONS_NATIVE }, data: form })

  public updateEmail = (form: UpdateEmailDTO) => 
    Http.put({ url: `${this.users}update/email`, headers: { ...HTTP_OPTIONS_NATIVE }, data: form })
  
  public getClientById = (id: string) => 
    this.httpClient.get<GetUserDTO>(`${this.users}getUsers/${id}`)

  public getClientByEmail = (email: string) =>
    this.httpClient.get<GetUserDTO>(`${this.users}getUserByEmail/${email}`)
}
