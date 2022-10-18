import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public postLoginMenu: any = [
    // { id: 1, name: 'Home', value: 'home', isActive: true, img: ''},
    { id: 1, name: 'Users', value: 'users', isActive: false, img: ''},
    { id: 2, name: 'Products', value: 'products', isActive: false, img: ''},
    { id: 3, name: 'Logout', value: 'logout', isActive: false, img: ''}
  ];

  public preLoginMenu: any = [];

  constructor(public authService: AuthService,
    private _router: Router) { }

  ngOnInit(): void {
  }

  selectMenu(index: number) {
    if (this.postLoginMenu[index].value === 'logout') {
      this.authService.userLogout();
      return;
    }
    for(let i = 0; i < this.postLoginMenu.length; i++) {
      this.postLoginMenu[i].isActive = false;
    }
    this.postLoginMenu[index].isActive = true;
    this._router.navigate([this.postLoginMenu[index].value]);
  }

  homeNav() {
    if(this.authService.getUser()) {
      this._router.navigate(['users']);
    } else {
      this._router.navigate(['signin']);
    }
  }

 }
