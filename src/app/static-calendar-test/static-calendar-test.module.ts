import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StaticCalendarTestPageRoutingModule } from './static-calendar-test-routing.module';

import { StaticCalendarTestPage } from './static-calendar-test.page';
import { StaticCalendarComponent } from '../static-calendar/static-calendar.component';
import { NameListComponent } from '../name-list/name-list.component';
import { DynamicCalendarComponent } from '../dynamic-calendar/dynamic-calendar.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule, 
    IonicModule,
    StaticCalendarTestPageRoutingModule
  ],
  declarations: [
    StaticCalendarTestPage
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class StaticCalendarTestPageModule {}
