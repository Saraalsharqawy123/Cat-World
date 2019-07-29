import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Tab3Page } from './tab3.page';
import { EditpasswordPage } from '../editpassword/editpassword.page';
import { EditprofilePage } from '../editprofile/editprofile.page';
import { AboutPage } from '../about/about.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([{ path: '', component: Tab3Page }])
  ],
  entryComponents:[AboutPage,EditpasswordPage,EditprofilePage],
  declarations: [Tab3Page,AboutPage,EditpasswordPage,EditprofilePage]
})
export class Tab3PageModule {}
