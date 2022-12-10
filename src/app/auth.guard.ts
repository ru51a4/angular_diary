import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {ApiService} from "./api.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, public api: ApiService) {
  }


  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
    let jwt = localStorage.getItem('jwt');
    if (!jwt) {
      this.router.navigate(['/login'])
    }
    this.api.setUserToken(jwt);
    this.api.check();
    return true;
  }

}
