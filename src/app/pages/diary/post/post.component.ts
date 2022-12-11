import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent {
  public post: any;

  constructor(public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: { replys: any[], posts: any[], id: number }) {
    this.post = (this.data.posts.find((item) => item.id === this.data.id));
  }

  openPost(id: any) {
    this.dialog.open(PostComponent, {
      width: '250px',
      data: {posts: this.data.posts, id: id, replys: this.data.replys},
      closeOnNavigation: true
    });
    document.querySelectorAll("span[class=reply]").forEach((item)=>{

    })

  }
}
