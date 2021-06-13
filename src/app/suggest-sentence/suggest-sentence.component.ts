import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { stopEventPropagation } from '../utils';
import { SuggestionService } from '../suggestion.service';

@Component({
  selector: 'app-suggest-sentence',
  templateUrl: './suggest-sentence.component.html',
  styleUrls: ['./suggest-sentence.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SuggestSentenceComponent {

  @Input() lastPageNumber!: number;

  constructor(private suggestion: SuggestionService) {}

  stopEventPropagation(event: MouseEvent): void {
    stopEventPropagation(event);
  }

  onSubmit(event: MouseEvent): void {
    stopEventPropagation(event);

    const input    = document.getElementById('suggestion') as HTMLInputElement;
    const sentence = input.value;

    this.suggestion.publishSuggestion(this.lastPageNumber, sentence);

    input.value = '';
  }
}
