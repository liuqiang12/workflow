import { Component, Input } from '@angular/core';

import { Notice } from '../models';

@Component({
  selector: 'app-notice-preview',
  templateUrl: './notice-preview.component.html'
})
export class NoticePreviewComponent {
  @Input() notice: Notice;

  onToggleFavorite(favorited: boolean) {
    this.notice['favorited'] = favorited;

    if (favorited) {
      this.notice['ticketsCount']++;
    } else {
      this.notice['ticketsCount']--;
    }
  }
}
