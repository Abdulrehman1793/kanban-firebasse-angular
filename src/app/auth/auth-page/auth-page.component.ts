import { Component, Optional } from '@angular/core';

import { Auth, authState, User } from '@angular/fire/auth';
import { EMPTY, Observable } from 'rxjs';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss'],
})
export class AuthPageComponent {
  public readonly user$: Observable<User | null> = EMPTY;

  constructor(@Optional() public auth: Auth) {
    this.user$ = authState(this.auth);
  }
}
