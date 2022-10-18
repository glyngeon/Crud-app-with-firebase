import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { AgGridModule, } from 'ag-grid-angular';
import { MaterialModule } from 'src/app/material/material/material.module';
import { ActionRendererMenu } from './action-renderer-menu';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [UsersComponent, ActionRendererMenu],
  imports: [
    CommonModule,
    UsersRoutingModule,
    AgGridModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class UsersModule { }
