import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { LayoutRoutingModule } from './layout-routing.module';
import { DefaultLayoutComponent } from './default-layout/default-layout.component';

import { MaterialModule } from '../material/material/material.module';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    MainLayoutComponent,
    DefaultLayoutComponent
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    MaterialModule,
  ]
})
export class LayoutModule { }
