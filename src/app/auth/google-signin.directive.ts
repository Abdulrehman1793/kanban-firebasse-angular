import { Directive, HostListener } from '@angular/core';

import { Auth, GoogleAuthProvider, signInWithPopup } from '@angular/fire/auth';

@Directive({
  selector: '[appGoogleSignin]',
})
export class GoogleSigninDirective {
  constructor(private auth: Auth) {}

  @HostListener('click')
  onClick() {
    signInWithPopup(this.auth, new GoogleAuthProvider());
  }
}
