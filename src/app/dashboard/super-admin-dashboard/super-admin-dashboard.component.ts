import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbar } from '@angular/material/toolbar';

@Component({
  selector: 'app-super-admin-dashboard',
  standalone: true,
  imports: [
   RouterModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatTableModule,
    MatIconModule,
    MatToolbar 
  ],
  templateUrl: './super-admin-dashboard.component.html',
  styleUrl: './super-admin-dashboard.component.scss'
})
export class SuperAdminDashboardComponent {
  displayedColumns: string[] = ['avatar', 'name', 'email', 'actions'];
  users: any[] = [];

  constructor(private http: HttpClient, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.http.get<any>('https://reqres.in/api/users').subscribe((res) => {
      this.users = res.data;

    });
  }

  deleteUser(id: number) {
    this.users = this.users.filter((user) => user.id !== id);
  }

  viewUserDetails(user: any) {
    this.router.navigate(['/user-details', user.id]);
  }

  logout() {
    this.authService.logout();
  }

  goToUserDashboard(){
    this.router.navigate(['/user-dashboard']);
  }
}
