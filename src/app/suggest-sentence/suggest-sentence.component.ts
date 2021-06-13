import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-suggest-sentence',
  templateUrl: './suggest-sentence.component.html',
  styleUrls: ['./suggest-sentence.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SuggestSentenceComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
