import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthComponent implements OnInit {

    constructor(private auth: AuthService) {}

    onGoogleSignIn(): void {
        this.auth.googleSignIn();
    }

    ngOnInit(): void {
    }

}
