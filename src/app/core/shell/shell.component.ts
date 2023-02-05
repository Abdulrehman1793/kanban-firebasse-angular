import { Component } from '@angular/core';

import { Auth } from '@angular/fire/auth';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
})
export class ShellComponent {
  constructor(public auth: Auth) {}
}
