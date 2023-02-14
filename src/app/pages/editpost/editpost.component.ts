import { Component, OnInit } from '@angular/core';
import { ApiService } from "../../api.service";
import { ActivatedRoute, NavigationStart, Router } from "@angular/router";
import { filter, Subject } from "rxjs";
import { FormControl, FormGroup } from "@angular/forms";
import { Store } from '@ngrx/store';
import { fetchPosts, getPost, editPost, deletePost } from 'src/app/store/store.actions';
import { selectPosts } from 'src/app/store/store.selectors';
@Component({
  selector: 'app-diary',
  templateUrl: './editpost.component.html',
  styleUrls: ['./editpost.component.css']
})

export class EditpostComponent implements OnInit {
  storeState$: any;
  constructor(public api: ApiService, public store: Store<any>, private router: Router, private route: ActivatedRoute) {

    this.storeState$ = this.store.select(selectPosts);
    this.storeState$.subscribe((data: any) => {
      let cPost = data.cPost;
      data = data.posts;
      data = data.p;
      // @ts-ignore
      let message = data.find((item) => item.id == this.route.snapshot.queryParams["id"]).message;
      // @ts-ignore
      if (data[0].id == this.route.snapshot.queryParams["id"]) {
        this.is_op = true;
      }
      this.postForm.patchValue({
        message: cPost.message
      });

    })

  }

  postForm = new FormGroup({
    message: new FormControl(''),
  });

  public is_op = false;

  ngOnInit() {
    this.store.dispatch(fetchPosts({ id: this.route.snapshot.queryParams["diaryId"] }));
    this.store.dispatch(getPost({ id: this.route.snapshot.queryParams["id"] }));
  }

  delete(e: any) {
    e.preventDefault();
    this.store.dispatch(deletePost({ is_op: this.is_op, id: this.route.snapshot.queryParams["id"], diaryId: this.route.snapshot.queryParams["diaryId"] }))
  }

  edit() {
    let message = this.postForm.value.message;
    this.store.dispatch(editPost({ message, id: this.route.snapshot.queryParams["id"], diaryId: this.route.snapshot.queryParams["diaryId"] }))
  }
}
