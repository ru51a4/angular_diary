import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DiaryRoutingModule} from "./diary-routing.module";
import {DiaryComponent} from "./diary.component";
import {PostComponent} from "./post/post.component";
import {MAT_DIALOG_DEFAULT_OPTIONS, MatDialogModule} from "@angular/material/dialog";


@NgModule({
  declarations: [DiaryComponent, PostComponent],
  imports: [
    CommonModule,
    DiaryRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule
  ],
  providers: [
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: true}}
  ]
})
export class DiaryModule {
}
