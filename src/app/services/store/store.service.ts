import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http, HttpOptions } from '@capacitor-community/http';
import { HTTP_OPTIONS, URL_SERVICIOS, HTTP_OPTIONS_NATIVE } from 'src/app/shared/commons/config';
import { 
  GetStockByCategoryDTO,
  GetCategoryDTO,
  RegisterStockDTO,
  GetProductByProductDTO,
  UpdateStockDTO
} from 'src/app/dtos/dtos.module';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  store: string = `${URL_SERVICIOS}store/`

  constructor(
    private httpClient: HttpClient
  ) { }

  public getProductsByCategory = (category: string) => 
    this.httpClient.get<GetStockByCategoryDTO[]>(`${this.store}getStock/category/${category}`)
  
  public getCategorys = () => 
    this.httpClient.get<GetCategoryDTO[]>(`${this.store}getCategory`)
  
  public registerStock = (form: RegisterStockDTO) => 
    {
      const options: HttpOptions = {
        url: `${this.store}registerStock`,
        headers: {
          ...HTTP_OPTIONS_NATIVE,
          'descrypt': JSON.stringify(form)
        },
      };
      return Http.post(options);
    }
  
  public newCategory = (form: GetCategoryDTO) =>
    Http.post({ url: `${this.store}newCategory`, headers: { ...HTTP_OPTIONS_NATIVE }, data: form })

  public getProductByProduct = (product: string) => 
    this.httpClient.get<GetProductByProductDTO>(`${this.store}getStock/${product}`)

  public updateStock = (form: UpdateStockDTO) =>
    Http.put({ url: `${this.store}updateStock`, headers: { ...HTTP_OPTIONS_NATIVE, 'descrypt': JSON.stringify(form) } })
}
