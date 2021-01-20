import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectYourTimetablePageRoutingModule } from './select-your-timetable-routing.module';

import { SelectYourTimetablePage } from './select-your-timetable.page';
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
    DynamicCalendarComponent
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class SelectYourTimetablePageModule {}
