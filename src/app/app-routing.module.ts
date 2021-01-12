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
    redirectTo: 'dynamic-calendar-test',
    pathMatch: 'full'
  },
  {
    path: 'dynamic-calendar-test',
    loadChildren: () => import('./dynamic-calendar-test/dynamic-calendar-test.module').then( m => m.DynamicCalendarTestPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
