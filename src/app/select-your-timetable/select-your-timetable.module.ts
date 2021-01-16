import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectYourTimetablePageRoutingModule } from './select-your-timetable-routing.module';

import { SelectYourTimetablePage } from './select-your-timetable.page';
import { DynamicCalendarTestPage } from '../dynamic-calendar-test/dynamic-calendar-test.page';
import { DynamicCalendarComponent } from '../dynamic-calendar/dynamic-calendar.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelectYourTimetablePageRoutingModule,

  ],
  declarations: [
    SelectYourTimetablePage,
    DynamicCalendarTestPage, 
    DynamicCalendarComponent
  ]
})
export class SelectYourTimetablePageModule {}
