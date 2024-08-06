import {Component, inject} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {AsyncPipe, NgForOf, NgIf, TitleCasePipe, UpperCasePipe} from "@angular/common";

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [
    NgIf,
    AsyncPipe,
    UpperCasePipe,
    TitleCasePipe,
    NgForOf
  ],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent {
  authService = inject(AuthService);
  accountDetail$ = this.authService.getDetail();
}
