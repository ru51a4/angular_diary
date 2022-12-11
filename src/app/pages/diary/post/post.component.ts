import {AfterContentChecked, Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements AfterContentChecked {
  public post: any;

  constructor(public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: { replys: any[], posts: any[], id: number }) {
    this.post = (this.data.posts.find((item) => item.id === this.data.id));
  }

  openPost(id: any) {
    this.dialog.open(PostComponent, {
      width: '250px',
      data: {posts: this.data.posts, id: Number(id), replys: this.data.replys},
      closeOnNavigation: true
    });
  }

  ngAfterContentChecked() {
    document.querySelectorAll(`div[cid="${this.data.id}"] span.reply`).forEach((item: any) => {
      item.onclick = (item: any) => {
        let id = item.target.innerText.match(/\d+/g).join('')
        this.openPost(id);
      }
    })
  }
}
