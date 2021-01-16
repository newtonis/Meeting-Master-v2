import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectUseModePageRoutingModule } from './select-use-mode-routing.module';

import { SelectUseModePage } from './select-use-mode.page';
import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'tabs',
    children: [
      {
        path: 'join-meeting',
        children: [
          {
            path: 'join-meeting',
            loadChildren: '../join-meeting/join-meeting.module#JoinMeetingModule'
    
            //loadChildren: () => import('./join-meeting/join-meeting.module').then( m => m.JoinMeetingPageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/app/tabs/schedule',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelectUseModePageRoutingModule
  ],
  declarations: [SelectUseModePage]
})
export class SelectUseModePageModule {}
