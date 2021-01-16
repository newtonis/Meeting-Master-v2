import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SelectUseModePage } from './select-use-mode.page';

const routes: Routes = [
  {
    path: '',
    component: SelectUseModePage,
    children: [
      {
        path: 'join-meeting',
        //loadChildren: '../join-meeting/join-meeting.module#JoinMeetingModule'
        children: [
          {
            path: '',
            loadChildren: () => import('../join-meeting/join-meeting.module').then( m => m.JoinMeetingPageModule)
          }
        ]
      },
      {
        path: 'create-meeting',
        //loadChildren: '../join-meeting/join-meeting.module#JoinMeetingModule'
        children: [
          {
            path: '',
            loadChildren: () => import('../create-meeting/create-meeting.module').then( m => m.CreateMeetingPageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: 'join-meeting',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: 'join-meeting',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelectUseModePageRoutingModule {}
