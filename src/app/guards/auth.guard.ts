import { CanActivate, Router } from '@angular/router';
import { UserService } from '../dashboard/user.service';
import { inject } from '@angular/core';

export class AuthGuard implements CanActivate {
  private userService = inject(UserService);
  private router = inject(Router);

  canActivate(): boolean {
    const user = this.userService.getCurrentUser();
    if (user && user.role) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}