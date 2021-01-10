import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StaticCalendarTestPage } from './static-calendar-test.page';

const routes: Routes = [
  {
    path: '',
    component: StaticCalendarTestPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StaticCalendarTestPageRoutingModule {}
