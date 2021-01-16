import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectUseModePageRoutingModule } from './select-use-mode-routing.module';

import { SelectUseModePage } from './select-use-mode.page';
import { Routes } from '@angular/router';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelectUseModePageRoutingModule
  ],
  declarations: [SelectUseModePage]
})
export class SelectUseModePageModule {}
