import { Component, OnInit } from '@angular/core';
import { ApiService } from "../../api.service";
import { ActivatedRoute, NavigationStart, Router } from "@angular/router";
import { filter, Subject } from "rxjs";
import { FormControl, FormGroup } from "@angular/forms";
import { GlobalService } from "../../global.service";
import { Store } from '@ngrx/store';
import { selectUser } from 'src/app/store/store.selectors';
import { UpdateUser } from 'src/app/store/store.actions';
@Component({
  selector: 'app-diary',
  templateUrl: './cabinet.component.html',
  styleUrls: ['./cabinet.component.css']
})

export class CabinetComponent implements OnInit {
  storeState$: any
  constructor(public api: ApiService, private route: ActivatedRoute, private store: Store<any>, private router: Router) {
    this.storeState$ = this.store.select(selectUser);
    this.storeState$.subscribe((data: any) => this.url = data.user.avatar);
  }
  ngOnInit() {
  }
  public url: any;

  update() {
    this.store.dispatch(UpdateUser({ url: this.url }));
  }
}
