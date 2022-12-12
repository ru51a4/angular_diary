import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../api.service";
import {ActivatedRoute, NavigationStart, Router} from "@angular/router";
import {filter, Subject} from "rxjs";
import {FormControl, FormGroup} from "@angular/forms";
import {GlobalService} from "../../global.service";

@Component({
  selector: 'app-diary',
  templateUrl: './cabinet.component.html',
  styleUrls: ['./cabinet.component.css']
})

export class CabinetComponent implements OnInit {

  constructor(public api: ApiService, private router: Router, public global: GlobalService) {

  }

  public url: any;


  ngOnInit() {
    this.url = this.global.user.getValue().avatar;
  }


  update() {
    this.api.updateUser(this.url).subscribe(() => {
      this.router.navigate(["/"]);
    });
  }
}
