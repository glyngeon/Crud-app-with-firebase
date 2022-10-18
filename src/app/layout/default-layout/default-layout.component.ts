import { Component, OnInit, ViewChild } from '@angular/core';
import {MatSidenav} from '@angular/material/sidenav';

@Component({
  selector: 'app-default-layout',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss']
})
export class DefaultLayoutComponent implements OnInit {
  @ViewChild('sidenav') sidenav!: MatSidenav;

  constructor() { }

  ngOnInit(): void {
  }


  clickHandler() {
    this.sidenav.close();
  }
}
