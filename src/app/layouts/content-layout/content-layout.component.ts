import { Component } from '@angular/core';
import { GlobalService } from "../../global.service";
import { Router } from "@angular/router";
import { ApiService } from "../../api.service";
import { Store } from '@ngrx/store';
import { selectUser } from 'src/app/store/store.selectors';
@Component({
  selector: 'app-content-layout',
  templateUrl: './content-layout.component.html',
  styleUrls: ['./content-layout.component.css']
})
export class ContentLayoutComponent {
  public storeState$: any;
  public user: any;
  constructor(public global: GlobalService, public store: Store<any>, private router: Router, private api: ApiService) {
    this.storeState$ = this.store.select(selectUser);
    this.storeState$.subscribe((data: any) => this.user = data.user);

  }

  logout() {
    this.api.logout()
  }
}

