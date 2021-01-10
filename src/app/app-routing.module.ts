import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'static-calendar-test',
    loadChildren: () => import('./static-calendar-test/static-calendar-test.module').then( m => m.StaticCalendarTestPageModule)
  },
  {
    path: 'name-list-test',
    loadChildren: () => import('./name-list-test/name-list-test.module').then( m => m.NameListTestPageModule)
  },
  {
    path: '',
    redirectTo: 'static-calendar-test',
    pathMatch: 'full'
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
