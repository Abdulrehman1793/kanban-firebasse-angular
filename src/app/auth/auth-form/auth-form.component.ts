import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import {
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
} from '@angular/fire/auth';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss'],
})
export class AuthFormComponent implements OnInit {
  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.minLength(6), Validators.required]],
    passwordConfirm: ['', []],
  });

  type: 'login' | 'signup' | 'reset' = 'signup';
  loading = false;

  serverMessage: string | undefined;

  constructor(private auth: Auth, private fb: FormBuilder) {}

  ngOnInit(): void {}

  changeType(val: any) {
    this.type = val;
  }

  get isLogin() {
    return this.type === 'login';
  }

  get isSignup() {
    return this.type === 'signup';
  }

  get isPasswordReset() {
    return this.type === 'reset';
  }

  get email() {
    return this.form.controls.email;
  }
  get password() {
    return this.form.controls.password;
  }

  get passwordConfirm() {
    return this.form.controls.passwordConfirm;
  }

  get passwordDoesMatch() {
    if (this.type !== 'signup') {
      return true;
    } else {
      if (this.password != null && this.passwordConfirm != null)
        return this.password.value === this.passwordConfirm.value;
      return false;
    }
  }

  async onSubmit() {
    this.loading = true;

    const email = this.email.value;
    const password = this.password.value;

    if (this.form.valid && email && password) {
      try {
        if (this.isLogin) {
          await signInWithEmailAndPassword(this.auth, email, password);
        }
        if (this.isSignup) {
          await createUserWithEmailAndPassword(this.auth, email, password);
        }
        if (this.isPasswordReset) {
          await sendPasswordResetEmail(this.auth, email);
          this.serverMessage = 'Check your email';
        }
      } catch (err: any) {
        this.serverMessage = err;
      }
    }

    this.loading = false;
  }
}
