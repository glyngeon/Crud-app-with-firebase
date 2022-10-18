import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class PreloginService {

  BASE_URL: string = environment.apiUrl;
  constructor(private _httpServie: HttpService) { }

  login(payload: any) {
    // return this._httpServie.get(`${this.BASE_URL}/users.json`, params);
    return this._httpServie.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword' + '?key='+environment.firebaseConfig.apiKey, payload);
  }

  signup(payload: any) {
    return this._httpServie.post(`${this.BASE_URL}/users.json`, payload);
  }

}
