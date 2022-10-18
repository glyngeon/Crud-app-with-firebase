import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ChartModule } from 'angular-highcharts';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { MaterialModule } from 'src/app/material/material/material.module';
import { AgGridModule, } from 'ag-grid-angular';
import { ActionRendererMenu } from './action-renderer-menu';


@NgModule({
  declarations: [
    ProductsComponent, 
    ActionRendererMenu
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    AgGridModule,
    ChartModule
  ]
})
export class ProductsModule { }
