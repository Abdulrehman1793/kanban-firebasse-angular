import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'title',
})
export class TitlePipe implements PipeTransform {
  transform(value: string): string {
    switch (value) {
      case 'signup':
        return 'Create Account';
      case 'login':
        return 'Sign In';
      case 'reset':
        return 'Reset Password';
      default:
        return '';
    }
  }
}
