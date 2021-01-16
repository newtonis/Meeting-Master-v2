import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JoinMeetingPageRoutingModule } from './join-meeting-routing.module';

import { JoinMeetingPage } from './join-meeting.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JoinMeetingPageRoutingModule
  ],
  declarations: [JoinMeetingPage]
})
export class JoinMeetingPageModule {}
