import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../api.service";
import {ActivatedRoute, NavigationStart, Router} from "@angular/router";
import {filter, Subject} from "rxjs";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-diary',
  templateUrl: './adddiary.component.html',
  styleUrls: ['./adddiary.component.css']
})

export class AdddiaryComponent implements OnInit {

  constructor(public api: ApiService, private router: Router) {


  }

  postForm = new FormGroup({
    name: new FormControl(''),
    desc: new FormControl('')
  });

  ngOnInit() {

  }


  add() {
    let name = this.postForm.value.name;
    let desc = this.postForm.value.desc;

    this.api.createDiary(name, desc).subscribe((data: any) => {
      this.router.navigate(
        ['/diary'],
        {queryParams: {id: data.id}}
      );
    })
  }
}
