import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class IsLoggedGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const loggedUser = localStorage.getItem('loggedUser');
    if (loggedUser) {
      this.router.navigate(['/home']);
      return false;
    }
    return true;
  }
}
