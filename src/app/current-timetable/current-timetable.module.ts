import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CurrentTimetablePageRoutingModule } from './current-timetable-routing.module';

import { CurrentTimetablePage } from './current-timetable.page';
import { StaticCalendarComponent } from '../static-calendar/static-calendar.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CurrentTimetablePageRoutingModule
  ],
  declarations: [
    CurrentTimetablePage,
    StaticCalendarComponent
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class CurrentTimetablePageModule {}
