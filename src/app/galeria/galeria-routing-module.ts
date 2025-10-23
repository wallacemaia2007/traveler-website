import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GaleriaComponent } from './galeria-component/galeria-component';

const routes: Routes = [
{

  path:'',
  component: GaleriaComponent,
  pathMatch: 'full'

}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GaleriaRoutingModule { }
