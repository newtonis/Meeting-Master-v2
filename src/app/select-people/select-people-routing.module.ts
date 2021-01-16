import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelectPeoplePage } from './select-people.page';

const routes: Routes = [
  {
    path: '',
    component: SelectPeoplePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelectPeoplePageRoutingModule {}
