import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../api.service";
import {ActivatedRoute, NavigationStart, Router} from "@angular/router";
import {filter, Subject} from "rxjs";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-diary',
  templateUrl: './editpost.component.html',
  styleUrls: ['./editpost.component.css']
})

export class EditpostComponent implements OnInit {

  constructor(public api: ApiService, private router: Router, private route: ActivatedRoute) {


  }

  postForm = new FormGroup({
    message: new FormControl(''),
  });

  public is_op = false;

  ngOnInit() {
    // @ts-ignore
    this.api.getDiary(this.route.snapshot.queryParams["diaryId"]).subscribe((data: any) => {
      data = data.p;
      // @ts-ignore
      let message = data.find((item) => item.id == this.route.snapshot.queryParams["id"]).message;
      // @ts-ignore
      if (data[0].id == this.route.snapshot.queryParams["id"]) {
        this.is_op = true;
      }
      this.api.getPost(this.route.snapshot.queryParams["id"]).subscribe((data: any) => {
        this.postForm.patchValue({
          message: data.message
        });
      })

    });
  }

  delete(e: any) {
    e.preventDefault();
    this.api.deletePost(this.route.snapshot.queryParams["id"]).subscribe(() => {
      if (this.is_op) {
        this.router.navigate(
          [''],
          {}
        );
      } else {
        this.router.navigate(
          ['/diary'],
          {queryParams: {id: this.route.snapshot.queryParams["diaryId"]}}
        );
      }
    })
  }

  edit() {
    let message = this.postForm.value.message;

    this.api.editPost(this.route.snapshot.queryParams["id"], message).subscribe((data: any) => {

      this.router.navigate(
        ['/diary'],
        {queryParams: {id: data.diary_id}}
      );
    })
  }
}
