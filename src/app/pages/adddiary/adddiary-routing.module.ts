import {NgModule} from '@angular/core';

import {Routes, RouterModule} from '@angular/router';
import {AdddiaryComponent} from "./adddiary.component";


const routes: Routes = [
  {
    path: '',
    component: AdddiaryComponent,
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AdddiaryRoutingModule {
}
