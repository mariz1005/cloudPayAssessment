import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'https://reqres.in/api/users';
  private apiUrl$ = 'https://reqres.in/api/login';
  private currentUser: any;
  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl$}`, { email, password });
  }
  getUsers(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?per_page=12`);
  }

  getUserById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  updateResource(id: number, updatedResource: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, updatedResource);
  }

  deleteResource(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  setCurrentUser(user: any): void {
    this.currentUser = user
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  getCurrentUser(): any {
    return this.currentUser || JSON.parse(localStorage.getItem('currentUser') || '{}');
  }

  getUserRole(): string {
    const user = this.getCurrentUser();
    return user?.role || '';
  }



  logout(): void {
    this.currentUser = null;
    localStorage.removeItem('currentUser');
  }
}
