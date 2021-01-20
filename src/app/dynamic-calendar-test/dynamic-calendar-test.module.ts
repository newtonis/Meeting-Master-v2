import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DynamicCalendarTestPageRoutingModule } from './dynamic-calendar-test-routing.module';

import { DynamicCalendarTestPage } from './dynamic-calendar-test.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DynamicCalendarTestPageRoutingModule
  ],
  declarations: [DynamicCalendarTestPage],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class DynamicCalendarTestPageModule {}
