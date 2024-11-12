import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { ResourceFormComponent } from '../resource-form/resource-form.component';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { MatToolbar } from '@angular/material/toolbar';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatTableModule,
    MatIconModule,
    MatToolbar,
    MatIcon
  ],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.scss'
})
export class UserDashboardComponent {
  resources: any[] = [];
  resourceForm: FormGroup;
  isEditMode = false;
  isAddMode = false;
  currentResourceId: number | null = null;
  isAdmin: boolean = false;
  constructor(private http: HttpClient, private authService: AuthService,private dialog: MatDialog,  private fb: FormBuilder, private userService: UserService, private router: Router) {
    this.resourceForm = this.fb.group({
      name: ['', Validators.required],
      year: ['', Validators.required],
      color: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.isAdmin = this.userService.getUserRole() === 'admin';
    this.http.get<any>('https://reqres.in/api/unknown').subscribe((res) => {
      this.resources = res.data;
    });
  }

  addResource(resource: any) {
    const dialogRef = this.dialog.open(ResourceFormComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.resources.push(result);
      }
    });
  }

  deleteResource(id: number) {
    this.resources = this.resources.filter((resource) => resource.id !== id);
  }

  

  logout() {
    this.authService.logout();
  }

  onAddNewResource(): void {
    this.isAddMode = true;
    this.isEditMode = false;
    this.currentResourceId = null;
    this.resourceForm.reset();
  }

  onEditResource(resource: any): void {
    this.isEditMode = true;
    this.isAddMode = false;
    this.currentResourceId = resource.id;


    this.resourceForm.patchValue({
      name: resource.name,
      year: resource.year,
      color: resource.color
    });
  }

  onSubmit(): void {
    const resourceData = this.resourceForm.value;

    if (this.isEditMode && this.currentResourceId !== null) {
      this.userService.updateResource(this.currentResourceId, resourceData).subscribe(() => {
        const index = this.resources.findIndex(res => res.id === this.currentResourceId);
        if (index !== -1) {
          this.resources[index] = { ...this.resources[index], ...resourceData };
        }
        this.isEditMode = false;
        this.currentResourceId = null;
        this.resourceForm.reset();
      });
    } else if (this.isAddMode) {
      const newId = Math.max(...this.resources.map(res => res.id)) + 1;
      this.resources.push({ id: newId, ...resourceData });
      this.isAddMode = false;
      this.resourceForm.reset();
    }
  }

  onCancel(): void {
    this.isEditMode = false;
    this.isAddMode = false;
    this.currentResourceId = null;
    this.resourceForm.reset();
  }

  onDeleteResource(id: number): void {
    this.userService.deleteResource(id).subscribe(() => {
      this.resources = this.resources.filter(resource => resource.id !== id);
      alert('Resource deleted successfully');
    });
  }

  goBack(){
    if (this.isAdmin) {
      this.router.navigate(['/super-admin']);
    }
  }
  
}
