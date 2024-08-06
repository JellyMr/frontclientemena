import {Routes} from '@angular/router';
import {LoginComponent} from "./pages/login/login.component";
import {HomeComponent} from "./pages/home/home.component";
import {RegisterComponent} from "./pages/register/register.component";
import {AccountComponent} from "./pages/account/account.component";
import {AuthGuard} from "./guards/authGuard";
import {UsersComponent} from "./pages/users/users.component";
import {RoleGuard} from "./guards/roleGuard";
import {RoleComponent} from "./pages/role/role.component";
import {ForgetPasswordComponent} from "./pages/forget-password/forget-password.component";
import {ResetPasswordComponent} from "./pages/reset-password/reset-password.component";
import {ChangePasswordComponent} from "./pages/change-password/change-password.component";

export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'account/:id', component: AccountComponent, canActivate: [AuthGuard]},
  {path: 'forget-password', component: ForgetPasswordComponent},
  {path: 'reset-password', component: ResetPasswordComponent},
  {path: 'change-password', component: ChangePasswordComponent, canActivate: [AuthGuard]},
  {path: 'users', component: UsersComponent, canActivate: [RoleGuard], data: {roles: ['Admin']}},
  {path: 'roles', component: RoleComponent, canActivate: [RoleGuard], data: {roles: ['Admin']}}
];
