import {CanActivateFn, Router} from '@angular/router';
import {MatSnackBar} from "@angular/material/snack-bar";
import {inject} from "@angular/core";
import {AuthService} from "../services/auth.service";

export const AuthGuard: CanActivateFn = (route, state) => {
  const matSnackbar = inject(MatSnackBar);

  if(inject(AuthService).isLoggedIn()) {
    return true;
  }

  matSnackbar.open('You must be logged in to view this page', 'Ok', {
    duration:300
  });

  inject(Router).navigate(['/'])

  return false;
};
