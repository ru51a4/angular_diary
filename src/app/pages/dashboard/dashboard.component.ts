import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ApiService } from "../../api.service";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { Store } from '@ngrx/store';
import { fetchDiarys, loadDiarys } from "./../../store/store.actions";
import { selectDiarys } from 'src/app/store/store.selectors';
import { filter, Observable, Subject, takeUntil } from "rxjs";


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  storeState$: Observable<any>;


  constructor(public api: ApiService, private route: ActivatedRoute, private store: Store<any>, private router: Router) {
    this.storeState$ = this.store.select(selectDiarys);

  }
  destroy$ = new Subject<boolean>();


  cPage = 1;
  ngOnInit() {
    this.fetchData()
    this.router.events.pipe(takeUntil(this.destroy$)).subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.fetchData();
      }
    });
  }

  fetchData() {
    if (this.route.snapshot.params['page']) {
      this.cPage = Number(this.route.snapshot.params['page']);
    }

    this.store.dispatch(fetchDiarys({ id: this.cPage }))


  }

  go(n: any) {
    this.router.navigate(['dashboard', n], {})
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
