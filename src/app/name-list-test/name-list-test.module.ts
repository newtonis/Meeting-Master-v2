import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NameListTestPageRoutingModule } from './name-list-test-routing.module';

import { NameListTestPage } from './name-list-test.page';
import { NameListComponent } from '../name-list/name-list.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NameListTestPageRoutingModule
  ],
  declarations: [
    NameListTestPage,
    NameListComponent
  ]
})
export class NameListTestPageModule {}
