import {AfterContentChecked, Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-post',
  templateUrl: './post-image.component.html',
  styleUrls: ['./post-image.component.css']
})
export class PostImageComponent {

  constructor(public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: { src: string }) {
  }

}
