import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NameListTestPageRoutingModule } from './name-list-test-routing.module';

import { NameListTestPage } from './name-list-test.page';
import { DynamicCalendarComponent } from '../dynamic-calendar/dynamic-calendar.component';
import { NameListComponent } from '../name-list/name-list.component';
import { StaticCalendarComponent } from '../static-calendar/static-calendar.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NameListTestPageRoutingModule
  ],
  declarations: [
    NameListTestPage
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class NameListTestPageModule {}
