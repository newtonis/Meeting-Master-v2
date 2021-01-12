import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DynamicCalendarTestPage } from './dynamic-calendar-test.page';

const routes: Routes = [
  {
    path: '',
    component: DynamicCalendarTestPage
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  
  ],
  exports: [RouterModule],
})
export class DynamicCalendarTestPageRoutingModule {}
