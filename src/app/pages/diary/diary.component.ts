import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../api.service";
import {ActivatedRoute, NavigationStart, Router} from "@angular/router";
import {filter, Subject} from "rxjs";

@Component({
  selector: 'app-diary',
  templateUrl: './diary.component.html',
  styleUrls: ['./diary.component.css']
})

export class DiaryComponent implements OnInit {


  constructor(public api: ApiService, private route: ActivatedRoute) {


  }

  posts: any = [];

  ngOnInit() {
    this.api.getDiary(this.route.snapshot.queryParams["id"]).subscribe((data) => {
      console.log(data);
      this.posts = data;
    })

  }
}
