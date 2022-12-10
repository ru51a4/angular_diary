import {NgModule} from '@angular/core';

import {Routes, RouterModule} from '@angular/router';
import {EditpostComponent} from "./editpost.component";


const routes: Routes = [
  {
    path: '',
    component: EditpostComponent,
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class EditpostRoutingModule {
}
