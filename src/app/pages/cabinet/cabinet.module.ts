import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CabinetComponent} from "./cabinet.component";
import {CabinetRoutingModule} from "./cabinet-routing.module";


@NgModule({
  declarations: [CabinetComponent],
  imports: [
    CommonModule,
    CabinetRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class CabinetModule {
}
