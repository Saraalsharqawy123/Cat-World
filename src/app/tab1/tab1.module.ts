import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { FilterPage } from '../filter/filter.page';
import { ViewownerPage } from '../viewowner/viewowner.page';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: Tab1Page }])
  ],
  entryComponents:[FilterPage,ViewownerPage],
  declarations: [Tab1Page,FilterPage,ViewownerPage]
})
export class Tab1PageModule {}
