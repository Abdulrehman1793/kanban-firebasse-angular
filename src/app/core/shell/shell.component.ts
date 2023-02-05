import { Component, OnInit } from '@angular/core';

import { Auth, onAuthStateChanged, User } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
})
export class ShellComponent implements OnInit {
  user?: User;

  constructor(public auth: Auth, private router: Router) {}

  ngOnInit(): void {
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        this.router.navigate(['/']);
      }
      this.user = user!;
    });
  }

  signOut() {
    this.auth.signOut().then(() => {
      this.router.navigate(['auth']);
    });
  }
}
