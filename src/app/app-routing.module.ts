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
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'dynamic-calendar-test',
    loadChildren: () => import('./dynamic-calendar-test/dynamic-calendar-test.module').then( m => m.DynamicCalendarTestPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'select-use-mode',
    loadChildren: () => import('./select-use-mode/select-use-mode.module').then( m => m.SelectUseModePageModule),

  },
  {
    path: 'create-meeting',
    loadChildren: () => import('./create-meeting/create-meeting.module').then( m => m.CreateMeetingPageModule)
  },
  {
    path: 'meeting/:id',
    loadChildren: () => import('./meeting/meeting.module').then( m => m.MeetingPageModule)
  },
  {
    path: 'select-your-timetable/:id',
    loadChildren: () => import('./select-your-timetable/select-your-timetable.module').then( m => m.SelectYourTimetablePageModule)
  },
  {
    path: 'about',
    loadChildren: () => import('./about/about.module').then( m => m.AboutPageModule)
  },
  {
    path: 'helpus',
    loadChildren: () => import('./helpus/helpus.module').then( m => m.HelpusPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
