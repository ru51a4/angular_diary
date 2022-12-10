import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../api.service";
import {ActivatedRoute, NavigationStart, Router} from "@angular/router";
import {filter, Subject} from "rxjs";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-diary',
  templateUrl: './diary.component.html',
  styleUrls: ['./diary.component.css']
})

export class DiaryComponent implements OnInit {


  constructor(public api: ApiService, private route: ActivatedRoute) {


  }

  postForm = new FormGroup({
    message: new FormControl(''),
  });
  posts: any = [];
  diaryId: any;

  ngOnInit() {
    this.fetchData();
    this.diaryId = this.route.snapshot.queryParams["id"]
  }

  fetchData() {
    this.api.getDiary(this.route.snapshot.queryParams["id"]).subscribe((data) => {
      this.posts = data;
    })
  }

  add() {
    let message = this.postForm.value.message;
    this.api.addPost(this.route.snapshot.queryParams["id"], message).subscribe(() => {
      this.fetchData();
      this.postForm.reset();
    })
  }
}
