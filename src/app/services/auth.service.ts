import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {LoginRequest} from "../interfaces/login-request";
import {map, Observable} from "rxjs";
import {AuthResponse} from "../interfaces/auth-response";
import {HttpClient} from "@angular/common/http";
import {jwtDecode} from "jwt-decode";
import {RegisterRequest} from "../interfaces/register-request";
import {UserDetail} from "../interfaces/user-detail";
import {ResetPasswordRequest} from "../interfaces/reset-password-request";
import {ChangePasswordRequest} from "../interfaces/change-password-request";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl = environment.apiUrl
  private userKey = 'token'

  constructor(private http: HttpClient) {
  }

  login(data: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}Account/login`, data).pipe(
      map((response) => {
        if (response.isSuccess) {
          localStorage.setItem(this.userKey, JSON.stringify(response));
        }
        return response;
      })
    );
  }

  register(data: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}Account/register`, data);
  }

  getDetail = (): Observable<UserDetail> => {
    return this.http.get<UserDetail>(`${this.apiUrl}Account/detail`)
  }

  forgotPassword = (email: string): Observable<AuthResponse> =>
    this.http.post<AuthResponse>(`${this.apiUrl}Account/forgot-password`, {email});

  resetPassword = (data: ResetPasswordRequest): Observable<AuthResponse> =>
    this.http.post<AuthResponse>(`${this.apiUrl}Account/reset-password`, data);

  changePassword = (data: ChangePasswordRequest): Observable<AuthResponse> =>
    this.http.post<AuthResponse>(`${this.apiUrl}Account/change-password`, data);

  getUserDetail = () => {
    const token = this.getToken();

    if (!token) return null;

    const decodedToken: any = jwtDecode(token);
    const userDetail = {
      id: decodedToken.nameid,
      fullname: decodedToken.name,
      email: decodedToken.email,
      roles: decodedToken.role || [],
    };

    return userDetail;
  }

  isLoggedIn = (): boolean => {
    const token = this.getToken();
    if (!token) return false;

    return true;
  }

  private isTokenExpired() {
    const token = this.getToken();
    if (!token) return true;

    const decode = jwtDecode(token);
    const isTokenExpired = Date.now() >= decode['exp']! * 1000;
    // if (isTokenExpired) this.logout();

    return true;
  }

  logout = (): void => {
    localStorage.removeItem(this.userKey);
  }

  getRoles = (): string[] | null => {
    const token = this.getToken();
    if (!token) return null;

    const decodedToken: any = jwtDecode(token);
    return decodedToken.role || null;
  }

  getAll = (): Observable<UserDetail[]> => this.http.get<UserDetail[]>(`${this.apiUrl}Account`);

  refreshToken = (data: {
    email: string,
    token: string,
    refreshToken: string
  }): Observable<AuthResponse> => this.http.post<AuthResponse>(`${this.apiUrl}Account/refresh-token`, data);

  getToken = (): string | null => {
    const user = localStorage.getItem(this.userKey);
    if (!user) return null;

    const userDetail: AuthResponse = JSON.parse(user);
    return userDetail.token
  }

  getRefreshToken = (): string | null => {
    const user = localStorage.getItem(this.userKey);
    if (!user) return null;

    const userDetail: AuthResponse = JSON.parse(user);
    return userDetail.refreshToken
  }
}
