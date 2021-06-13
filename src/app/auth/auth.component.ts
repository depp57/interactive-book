import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { stopEventPropagation } from '../utils';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthComponent implements OnInit {

  constructor(private auth: AuthService) {}

  onGoogleSignIn(event: MouseEvent): void {
    stopEventPropagation(event);
    this.auth.googleSignIn();
  }

  onEmailSignIn(event: MouseEvent): void {
    stopEventPropagation(event);
    this.auth.anonymouslySignIn();
  }

  ngOnInit(): void {
  }
}
