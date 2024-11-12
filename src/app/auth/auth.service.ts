import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { UserService } from '../dashboard/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly reqresUrl = 'https://reqres.in/api/login';
  private userRole = new BehaviorSubject<string>('');
  userRole$ = this.userRole.asObservable();
  public currentUserRole = new BehaviorSubject<string | null>(null);

  constructor(private http: HttpClient, private router: Router, private userService: UserService) { }

  login(email: string, password: string) {
    const loginPayload = { email, password };
    return this.http.post(this.reqresUrl, loginPayload).subscribe({
      next: (response) => {
        if (response && (email === 'eve.holt@reqres.in' || email === 'charles.morris@reqres.in' || email === 'tracey.ramos@reqres.in')) {
          this.userRole.next('admin');
          this.router.navigate(['/super-admin']);
        } else {
          this.userRole.next('user');
          this.router.navigate(['/user-dashboard']);
        }
        localStorage.setItem('userRole', this.userRole.value);
      },
      error: () => {
        alert('Invalid credentials. Use email "admin.example@reqres.in" with any password.');

      }
    });
  }

  setUserRole(role: string) {
    this.currentUserRole.next(role);
  }

  getRole(): string {
    return localStorage.getItem('userRole') ?? '';
  }

  isLoggedIn(): boolean {
    return this.getRole() !== '';
  }

  logout(): void {
    this.userRole.next('');
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
