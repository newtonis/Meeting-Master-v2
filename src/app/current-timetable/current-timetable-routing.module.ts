import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CurrentTimetablePage } from './current-timetable.page';

const routes: Routes = [
  {
    path: '',
    component: CurrentTimetablePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CurrentTimetablePageRoutingModule {}
