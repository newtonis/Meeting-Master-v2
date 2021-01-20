import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectPeoplePageRoutingModule } from './select-people-routing.module';

import { SelectPeoplePage } from './select-people.page';
import { NameListComponent } from '../name-list/name-list.component';

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
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class SelectPeoplePageModule {}
