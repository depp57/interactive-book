import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {

    public isLoggedIn: Observable<boolean> = this.auth.isLoggedIn;

    constructor(private auth: AuthService) {
        this.auth.isLoggedIn.subscribe(value => console.log('logged in ? ', value));
    }

    ngOnInit(): void {
        const pages = document.getElementsByClassName('page');
        for (let i = 0; i < pages.length; i++) {
            const page = pages[i] as HTMLElement;
            if (i % 2 === 0) {
                page.style.zIndex = `${(pages.length - i)}`;
            }
        }

        document.addEventListener('DOMContentLoaded', function () {
            for (let i = 0; i < pages.length; i++) {
                //Or var page = pages[i];

                const page = pages[i] as HTMLElement;

                page.onclick = function () {
                    if ((i + 1) % 2 === 0) {
                        page.classList.remove('flipped');
                        page.previousElementSibling?.classList.remove('flipped');
                    }
                    else {
                        page.classList.add('flipped');
                        page.nextElementSibling?.classList.add('flipped');
                    }
                };
            }
        });
    }
}
