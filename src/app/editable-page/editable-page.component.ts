import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { BookService, Page } from '../book.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-editable-page',
  templateUrl: './editable-page.component.html',
  styleUrls: ['./editable-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditablePageComponent implements OnInit {

  @Input() pageNumber!: number;
  pageContent!: Observable<Page | undefined>;
  isLoggedIn = this.auth.isLoggedIn;

  constructor(private auth: AuthService,
              private storage: BookService) {}

  ngOnInit(): void {
    this.pageContent = this.storage.getPageContent(this.pageNumber);
  }

}
