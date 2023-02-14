import { Component, OnInit } from '@angular/core';
import { ApiService } from "../../api.service";
import { ActivatedRoute, NavigationStart, Router } from "@angular/router";
import { filter, Subject } from "rxjs";
import { FormControl, FormGroup } from "@angular/forms";
import { Store } from '@ngrx/store';
import { createDiary,  } from "./../../store/store.actions";


@Component({
  selector: 'app-diary',
  templateUrl: './adddiary.component.html',
  styleUrls: ['./adddiary.component.css']
})

export class AdddiaryComponent implements OnInit {

  constructor(public api: ApiService, private router: Router, private store: Store<any>) {


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
    this.store.dispatch(createDiary({ name, desc }))
  }
}
