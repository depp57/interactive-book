import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { BookService, Page } from '../book.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageComponent implements OnInit {

  @Input() pageNumber!: number;
  pageContent!: Observable<Page | undefined>

  constructor(private storage: BookService) { }

  ngOnInit(): void {
   this.pageContent = this.storage.getPageContent(this.pageNumber);
  }

}
