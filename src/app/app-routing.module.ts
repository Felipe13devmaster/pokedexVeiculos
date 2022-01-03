import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadChildren: () => import('./modules/home/home.module').then(m => m.NavegacaoModule),
  },
  {
    path: 'carros',
    loadChildren: () => import('./modules/carros/carros.module').then(m => m.ListaCarrosModule),
  },
  {
    path: 'anuncios',
    loadChildren: () => import('./modules/anuncios/anuncios.module').then(m => m.AnunciosModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
