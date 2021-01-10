import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NameListTestPage } from './name-list-test.page';

const routes: Routes = [
  {
    path: '',
    component: NameListTestPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NameListTestPageRoutingModule {}
