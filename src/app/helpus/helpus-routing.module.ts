import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HelpusPage } from './helpus.page';

const routes: Routes = [
  {
    path: '',
    component: HelpusPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HelpusPageRoutingModule {}
