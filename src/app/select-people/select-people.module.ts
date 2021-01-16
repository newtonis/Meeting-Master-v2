import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectPeoplePageRoutingModule } from './select-people-routing.module';

import { SelectPeoplePage } from './select-people.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelectPeoplePageRoutingModule
  ],
  declarations: [SelectPeoplePage]
})
export class SelectPeoplePageModule {}
