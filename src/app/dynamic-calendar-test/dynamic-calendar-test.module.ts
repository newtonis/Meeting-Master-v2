import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DynamicCalendarTestPageRoutingModule } from './dynamic-calendar-test-routing.module';

import { DynamicCalendarTestPage } from './dynamic-calendar-test.page';
import { DynamicCalendarComponent } from '../dynamic-calendar/dynamic-calendar.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DynamicCalendarTestPageRoutingModule
  ],
  declarations: [DynamicCalendarTestPage, DynamicCalendarComponent]
})
export class DynamicCalendarTestPageModule {}
