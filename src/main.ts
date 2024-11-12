import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { AuthService } from './app/auth/auth.service';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter, Routes } from '@angular/router';
import { LoginComponent } from './app/auth/login/login.component';
import { UserDashboardComponent } from './app/dashboard/user-dashboard/user-dashboard.component';
import { SuperAdminDashboardComponent } from './app/dashboard/super-admin-dashboard/super-admin-dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserDetailsComponent } from './app/dashboard/user-details/user-details.component';
import { AuthGuard } from './app/guards/auth.guard';
import { UserService } from './app/dashboard/user.service';
const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'super-admin', component: SuperAdminDashboardComponent ,
    canActivate: [AuthGuard],
    data: { role: 'admin' },
  },
  { path: 'user-details/:id', component: UserDetailsComponent ,
    canActivate: [AuthGuard],
    data: { role: 'admin' },
  },
  { path: 'user-dashboard', component: UserDashboardComponent,
    canActivate: [AuthGuard],
    data: { role: 'user'},
   },
];


bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    BrowserAnimationsModule ,
    provideHttpClient(),
    AuthService,
    UserService,
    AuthGuard
  ],
}).catch((err) => console.error(err));