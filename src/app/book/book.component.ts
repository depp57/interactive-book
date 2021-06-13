import { AfterViewChecked, ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { BookService } from '../book.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookComponent {

  pages           = this.storage.countPages();
  isPageNumberOdd = false;

  constructor(private storage: BookService,
              private changeDetector: ChangeDetectorRef) {
    this.storage.countPages().subscribe(() => this.animateBook());
  }

  private animateBook(): void {
    let pages             = document.getElementsByClassName('page');
    const isPageNumberOdd = pages.length % 2 !== 0;

    if (isPageNumberOdd) {
      this.isPageNumberOdd = true;
      this.changeDetector.detectChanges();
      pages = document.getElementsByClassName('page');
    }

    for (let i = 0; i < pages.length; i++) {
      const page = pages[i] as HTMLElement;

      page.style.display = '';

      if (i % 2 === 0) {
        page.style.zIndex = `${(pages.length - i)}`;
      }

      page.addEventListener('click', () => {
        if (i % 2 === 1) {
          page.classList.remove('flipped');
          page.previousElementSibling?.classList.remove('flipped');
        }
        else {
          page.classList.add('flipped');
          page.nextElementSibling?.classList.add('flipped');
        }
      });
    }
  }
}
