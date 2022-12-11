import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ContentLayoutComponent} from './layouts/content-layout/content-layout.component';
import {AuthGuard} from "./auth.guard";


const routes: Routes = [{
  path: '',
  component: ContentLayoutComponent,
  children: [
    {
      path: 'dashboard/:page',
      loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule),
      canActivate: [AuthGuard]
    },
    {
      path: 'diary',
      loadChildren: () => import('./pages/diary/diary.module').then(m => m.DiaryModule),
      canActivate: [AuthGuard]
    },
    {
      path: 'login',
      loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule),
      canActivate: []
    },
    {
      path: 'create-diary',
      loadChildren: () => import('./pages/adddiary/adddiary.module').then(m => m.AdddiaryModule),
      canActivate: [AuthGuard]
    }, {
      path: 'edit-post',
      loadChildren: () => import('./pages/editpost/editpost.module').then(m => m.EditpostModule),
      canActivate: [AuthGuard]
    },{
      path: 'cabinet',
      loadChildren: () => import('./pages/cabinet/cabinet.module').then(m => m.CabinetModule),
      canActivate: [AuthGuard]
    },
    {
      path: '**',
      loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule),
      canActivate: [AuthGuard]
    },]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
