import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectPeoplePageRoutingModule } from './select-people-routing.module';

import { SelectPeoplePage } from './select-people.page';
import { NameListComponent } from '../name-list/name-list.component';
import { NameListTestPageModule } from '../name-list-test/name-list-test.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelectPeoplePageRoutingModule
  ],
  declarations: [
    SelectPeoplePage,
    NameListComponent
  ]
})
export class SelectPeoplePageModule {}
