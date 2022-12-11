import {AfterContentChecked, Component, OnInit} from '@angular/core';
import {ApiService} from "../../api.service";
import {ActivatedRoute, NavigationStart, Router} from "@angular/router";
import {filter, Subject} from "rxjs";
import {FormControl, FormGroup} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {PostComponent} from "./post/post.component";

@Component({
  selector: 'app-diary',
  templateUrl: './diary.component.html',
  styleUrls: ['./diary.component.css']
})

export class DiaryComponent implements OnInit, AfterContentChecked {


  constructor(public api: ApiService, private route: ActivatedRoute, public dialog: MatDialog) {


  }

  ngAfterContentChecked() {
    document.querySelectorAll("span.reply").forEach((item: any) => {
      item.onclick = (item: any) => {
        let id = item.target.innerText.match(/\d+/g).join('')
        this.openPost(id);
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
    this.postForm.patchValue({message: this.postForm.value.message + `<reply>${id}</reply>`})
  }

  ngOnInit() {
    this.fetchData();
    this.diaryId = this.route.snapshot.queryParams["id"]
  }

  fetchData() {
    this.api.getDiary(this.route.snapshot.queryParams["id"]).subscribe((data: any) => {
      this.posts = data.p;
      this.replys = data.r;


    })
  }

  openPost(id: any) {
    this.dialog.open(PostComponent, {
      width: '250px',
      data: {posts: this.posts, id: Number(id), replys: this.replys},
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
