import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LugaresRoutingModule } from './lugares-routing-module';
import { Lugar } from './lugar/lugar-component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    Lugar
  ],
  imports: [
    CommonModule,
    LugaresRoutingModule,
    ReactiveFormsModule,
  ]
})
export class LugaresModule { }
