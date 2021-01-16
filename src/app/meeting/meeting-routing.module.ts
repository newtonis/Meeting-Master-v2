import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MeetingPage } from './meeting.page';


const routes: Routes = [
  {
    path: '',
    component: MeetingPage,
    children: [
      {
        path: 'select-people',
        children: [
          {
            path: '',
            loadChildren: () => import('../select-people/select-people.module').then( m => m.SelectPeoplePageModule)
          }
        ]
      },
      {
        path: 'current-timetable',
        children: [
          {
            path: '',
            loadChildren: () => import('../current-timetable/current-timetable.module').then( m => m.CurrentTimetablePageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: 'current-timetable',
        pathMatch: 'prefix'
      }
    ]
  },
  {
    path: '',
    redirectTo: 'current-timetable',
    pathMatch: 'prefix'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MeetingPageRoutingModule {}
