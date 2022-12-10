import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {EditpostComponent} from "./editpost.component";
import {EditpostRoutingModule} from "./editpost-routing.module";


@NgModule({
  declarations: [EditpostComponent],
  imports: [
    CommonModule,
    EditpostRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class EditpostModule {
}
