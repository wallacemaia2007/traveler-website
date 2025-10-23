import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Layout } from './layout/layout';

const routes: Routes = [
  {
    path: '',
    component: Layout,
    children: [
      {
        path: 'categorias',
        loadChildren: () =>
          import('../categorias/categorias-module').then((m) => m.CategoriasModule),
      },
      {
        path: 'lugares',
        loadChildren: () => import('../lugares/lugares-module').then((m) => m.LugaresModule),
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TemplateRoutingModule {}
