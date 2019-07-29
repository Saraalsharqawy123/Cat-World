import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './register/register.module#RegisterPageModule' },
  { path: 'editcat', loadChildren: './editcat/editcat.module#EditcatPageModule' },
  { path: 'addcat', loadChildren: './addcat/addcat.module#AddcatPageModule' },
  { path: 'editpassword', loadChildren: './editpassword/editpassword.module#EditpasswordPageModule' },
  { path: 'editprofile', loadChildren: './editprofile/editprofile.module#EditprofilePageModule' },
  { path: 'filter', loadChildren: './filter/filter.module#FilterPageModule' },
  { path: 'viewowner', loadChildren: './viewowner/viewowner.module#ViewownerPageModule' },
  { path: 'about', loadChildren: './about/about.module#AboutPageModule' }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
