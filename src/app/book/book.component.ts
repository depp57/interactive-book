import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { BookService } from '../book.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class BookComponent {

  pages = this.storage.countPages();

  constructor(private storage: BookService) {
    this.storage.countPages().subscribe(() => this.animateBook());
  }

  private animateBook(): void {
    let pages             = document.getElementsByClassName('page');
    const isPageNumberOdd = pages.length % 2 !== 0;

    if (isPageNumberOdd) {
      const lastPage = pages[pages.length - 1];
      this.addEndingPage(lastPage);
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

  private addEndingPage(lastPage: Element): void {
    const newPage       = document.createElement('div');
    newPage.className   = 'page';
    const centerDiv     = document.createElement('div');
    centerDiv.className = 'center';
    const text          = document.createElement('h3');
    text.innerText      = 'Fin';
    centerDiv.append(text);
    newPage.append(centerDiv);

    const book = document.getElementById('pages');

    book?.insertBefore(newPage, lastPage);
  }
}
