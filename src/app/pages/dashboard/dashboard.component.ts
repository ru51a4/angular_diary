import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../api.service";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  constructor(public api: ApiService, private route: ActivatedRoute, private router: Router) {

  }

  public diary: any = [];
  page: any;
  cPage = 1;

  ngOnInit() {
    this.fetchData()
    this.router.events.subscribe((val) => {
      if(val instanceof NavigationEnd) {
        this.fetchData();
      }
    });
  }

  fetchData() {
    if (this.route.snapshot.params['page']) {
      this.cPage = Number(this.route.snapshot.params['page']);
    }
    this.api.getDashboard(this.cPage).subscribe((data: any) => {
      this.page = Number(data.p);
      this.diary = data.d;
    })
  }

  go(n: any) {
    this.router.navigate(['dashboard', n], {})
  }
}
