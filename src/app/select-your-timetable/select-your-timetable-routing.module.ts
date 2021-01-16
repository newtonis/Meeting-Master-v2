import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelectYourTimetablePage } from './select-your-timetable.page';

const routes: Routes = [
  {
    path: '',
    component: SelectYourTimetablePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelectYourTimetablePageRoutingModule {}
