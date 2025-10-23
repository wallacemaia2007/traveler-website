import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Lugar } from './lugar/lugar-component';

const routes: Routes = [
  {
    path: '',
    component: Lugar,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LugaresRoutingModule { }
