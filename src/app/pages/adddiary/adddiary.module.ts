import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AdddiaryComponent} from "./adddiary.component";
import {AdddiaryRoutingModule} from "./adddiary-routing.module";


@NgModule({
  declarations: [AdddiaryComponent],
  imports: [
    CommonModule,
    AdddiaryRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class AdddiaryModule {
}
