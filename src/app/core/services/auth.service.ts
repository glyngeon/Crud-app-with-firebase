import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _router: Router) {
    window.addEventListener('storage', (event: any) => {
      if (event.storageArea === localStorage) {
        const token = localStorage.getItem('currentUser');
        if(!token) {
          this.userLogout();
          this._router.navigate(['signin']);
        }
      }
    });
   }


  getUser() {
    const outputObj = localStorage.getItem('currentUser');
    if(outputObj) {
      return JSON.parse(outputObj);
    } else {
      return null;
    }
  }

  setUser(currentUser: any) {
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
  }

  setAdminRole() {
    return localStorage.setItem('admin', 'true');
  }

  getAdminRole() {
    return localStorage.getItem('admin');
  }

  userLogout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('admin');
    this._router.navigate(['signin']);
  }

  getEncodedToken() {
    return localStorage.getItem('currentUser');
  }

}
