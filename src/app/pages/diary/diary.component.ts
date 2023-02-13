import { AfterContentChecked, Component, OnInit } from '@angular/core';
import { ApiService } from "../../api.service";
import { ActivatedRoute, NavigationStart, Router } from "@angular/router";
import { filter, Observable, Subject } from "rxjs";
import { FormControl, FormGroup } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { PostComponent } from "./post/post.component";
import { GlobalService } from "../../global.service";
import { PostImageComponent } from "./post-image/post-image.component";
import { Store } from '@ngrx/store';
import { selectPosts } from 'src/app/store/store.selectors';
import { fetchPosts, loadDiarys } from "./../../store/store.actions";


@Component({
  selector: 'app-diary',
  templateUrl: './diary.component.html',
  styleUrls: ['./diary.component.css']
})

export class DiaryComponent implements OnInit, AfterContentChecked {

  storeState$: Observable<any>;

  constructor(private store: Store<{ posts: { posts: { p: any[], r: any[] } } }>, public api: ApiService, private route: ActivatedRoute, public dialog: MatDialog, public global: GlobalService) {
    this.storeState$ = this.store.select(selectPosts);
    this.storeState$.subscribe((data: any) => {
      console.log(data);
      data = data.posts;
      this.posts = data.p;
      this.replys = data.r;
    })
  }

  ngAfterContentChecked() {
    document.querySelectorAll("span.reply").forEach((item: any) => {
      item.onclick = (item: any) => {
        let id = item.target.innerText.match(/\d+/g).join('')
        this.openPost(id);
      }
    })
    document.querySelectorAll(".card-text img").forEach((item: any) => {
      item.onclick = (item: any) => {
        let src = item.target.src
        this.openImage(src);
      }
    })
  }

  postForm = new FormGroup({
    message: new FormControl(''),
  });
  posts: any = [];
  diaryId: any;
  replys: any = [];

  reply(id: any) {
    this.postForm.patchValue({ message: this.postForm.value.message + `<reply>${id}</reply>` })
  }

  ngOnInit() {
    this.fetchData();
    this.diaryId = this.route.snapshot.queryParams["id"]
  }

  fetchData() {
    this.store.dispatch(fetchPosts({ id: this.route.snapshot.queryParams["id"] }));
  }

  openPost(id: any) {
    this.dialog.open(PostComponent, {
      width: '250px',
      data: { posts: this.posts, id: Number(id), replys: this.replys },
      hasBackdrop: true,
      backdropClass: 'fuck',
      closeOnNavigation: true
    });
  }

  openImage(src: any) {
    this.dialog.open(PostImageComponent, {
      data: { src: src },
      hasBackdrop: true,
      backdropClass: 'fuck',
      closeOnNavigation: true
    });
  }

  add() {
    let message = this.postForm.value.message;
    this.api.addPost(this.route.snapshot.queryParams["id"], message).subscribe(() => {
      this.fetchData();
      this.postForm.reset();
    })
  }
}
