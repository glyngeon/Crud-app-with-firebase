import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class PostloginService {
  private BASE_URL: string = environment.apiUrl;
  constructor(private _httpService: HttpService) { }

  getUserList() {
    return this._httpService.get(`${this.BASE_URL}/users.json`);
  }

  addNewUser(reqParam: any) {
    return this._httpService.post(`${this.BASE_URL}/users.json` , reqParam);
  }

  updateUser(reqParam: any, reqId: any) {
    let tempReq = {
      [reqId]: { ...reqParam }
    }
    console.log(tempReq);
    return this._httpService.patch(`${this.BASE_URL}/users.json` , tempReq);
  }

  deleteUser(reqParam: any) {
      return this._httpService.delete(`${this.BASE_URL}/users/${reqParam}.json`);
  }

  getProductList() {
    return this._httpService.get(`${this.BASE_URL}/products.json`);
  }

  addNewProduct(reqParam: any) {
    return this._httpService.post(`${this.BASE_URL}/products.json` , reqParam);
  }

  updateProduct(reqParam: any, reqId: any) {
    let tempReq = {
      [reqId]: { ...reqParam }
    }
    console.log(tempReq);
    return this._httpService.patch(`${this.BASE_URL}/products.json` , tempReq);
  }

  deleteProduct(reqParam: any) {
    return this._httpService.delete(`${this.BASE_URL}/products/${reqParam}.json`);
  }
}
