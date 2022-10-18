import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanDeactivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  preLoginRoutes = ['/signin', '/signup'];

  constructor(private _authService: AuthService,
    private _router: Router,
    private _location: Location) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree | any {
    if (!this._authService.getUser()){
      if (this.preLoginRoutes.find((ele: string) => state.url.includes(ele))) {
        return true;
      } else if (!this.preLoginRoutes.find((ele: string) => state.url.includes(ele))) {
        console.log('auth 111')
        this._router.navigate(['/signin']);
      } else {
        console.log('auth 222')
        this._location.back();
        return false;
      } 
    } else {
       if (this.preLoginRoutes.find((ele: string) => state.url.includes(ele))) {
        this._router.navigate(['/home']);
        return false;
       } else {
        return true;
       }
    }
  }
}
