import { Component, Input } from '@angular/core';

import { Notice } from '../models';

@Component({
  selector: 'app-notice-meta',
  templateUrl: './notice-meta.component.html'
})
export class NoticeMetaComponent {
  @Input() notice: Notice;
}
