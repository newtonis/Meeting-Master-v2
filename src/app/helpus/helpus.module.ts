import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HelpusPageRoutingModule } from './helpus-routing.module';

import { HelpusPage } from './helpus.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HelpusPageRoutingModule
  ],
  declarations: [HelpusPage]
})
export class HelpusPageModule {}
