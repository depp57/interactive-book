import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BookService } from '../book.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookComponent {

  pages = this.storage.countPages();

  constructor(private storage: BookService) {
    this.storage.countPages().subscribe(() => this.ouioui());
  }

  ouioui(): void {
    const pages = document.getElementsByClassName('page');

    for (let i = 0; i < pages.length; i++) {
      const page = pages[i] as HTMLElement;

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
