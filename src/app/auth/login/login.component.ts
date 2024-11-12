import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { UserService } from '../../dashboard/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatTableModule,
    MatIconModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  loginForm: any;
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

  }
  onSubmit() {
    if (this.loginForm.valid) {
      const email = this.loginForm.value.email;
      const password = this.loginForm.value.password || 'admin';
      this.authService.login(email, password);
      this.userService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe(
        (response) => {
          const role = (email === 'eve.holt@reqres.in' || email === 'charles.morris@reqres.in' || email === 'tracey.ramos@reqres.in') ? 'admin' : 'user'
          const user = { ...response, role };
          this.userService.setCurrentUser(user);
          if (user.role === 'admin') {
            this.router.navigate(['/super-admin']);
          } else {
            this.router.navigate(['/user-dashboard']);
            localStorage.removeItem('currentUser');
            localStorage.removeItem('userRole');
          }
        }
      );
    } else {
      alert('Please enter valid credentials.');
    }
  }
}
