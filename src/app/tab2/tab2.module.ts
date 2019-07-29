import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Tab2Page } from './tab2.page';
import { EditcatPage } from '../editcat/editcat.page';
import { AddcatPage } from '../addcat/addcat.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    
    RouterModule.forChild([{ path: '', component: Tab2Page }])
  ],
  entryComponents:[EditcatPage,AddcatPage],
  declarations: [Tab2Page,EditcatPage,AddcatPage]
})
export class Tab2PageModule {}
