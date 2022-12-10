import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ContentLayoutComponent} from './layouts/content-layout/content-layout.component';
import {AuthGuard} from "./auth.guard";


const routes: Routes = [{
  path: '',
  component: ContentLayoutComponent,
  children: [
    {
      path: '',
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
    }]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
