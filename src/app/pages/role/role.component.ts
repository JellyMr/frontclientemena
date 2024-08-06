import {Component, inject} from '@angular/core';
import {RoleFormComponent} from "../../components/role-form/role-form.component";
import {RoleService} from "../../services/role.service";
import {RoleCreateRequest} from "../../interfaces/role-create-request";
import {MatSnackBar} from "@angular/material/snack-bar";
import {HttpErrorResponse} from "@angular/common/http";
import {RoleListComponent} from "../../components/role-list/role-list.component";
import {AsyncPipe} from "@angular/common";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-role',
  standalone: true,
  imports: [
    RoleFormComponent,
    RoleListComponent,
    AsyncPipe,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ],
  templateUrl: './role.component.html',
  styleUrl: './role.component.css'
})
export class RoleComponent {
  roleService = inject(RoleService);
  authService = inject(AuthService);
  errorMessage = '';
  role: RoleCreateRequest = {} as RoleCreateRequest;
  snackBar = inject(MatSnackBar);
  roles$ = this.roleService.getRoles();
  users$ = this.authService.getAll();
  selectedRole: string = '';
  selectedUser: string = '';

  createRole(role: RoleCreateRequest) {
    this.roleService.createRole(role).subscribe({
      next: (response) => {
        this.snackBar.open('Role created successfully', 'Ok', {
          duration: 3000,
        });
      },
      error: (error: HttpErrorResponse) => {
        if (error.status === 400) {
          this.errorMessage = error.error;
        }
      }
    })
  }

  deleteRole(id: string) {
    this.roleService.deleteRole(id).subscribe({
      next: (response) => {
        this.roles$ = this.roleService.getRoles();
        this.snackBar.open('Role deleted successfully', 'Ok', {
          duration: 3000,
        });
      },
      error: (error: HttpErrorResponse) => {
        this.snackBar.open(error.message, 'Close', {
          duration: 3000,
        });
      },
    });
  }

  assignRole() {
    this.roleService.assignRole(this.selectedUser, this.selectedRole).subscribe({
      next: (response) => {
        this.roles$ = this.roleService.getRoles();
        this.snackBar.open('Role Assigned successfully', 'Ok', {
          duration: 3000
        });
      },
      error: (error: HttpErrorResponse) => {
        this.snackBar.open(error.message, 'Close', {
          duration: 3000,
        });
      },
    });
  }
}
