import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CurrentTimetablePageRoutingModule } from './current-timetable-routing.module';

import { CurrentTimetablePage } from './current-timetable.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CurrentTimetablePageRoutingModule
  ],
  declarations: [CurrentTimetablePage]
})
export class CurrentTimetablePageModule {}
