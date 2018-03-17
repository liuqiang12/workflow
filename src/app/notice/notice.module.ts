import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NoticeComponent } from './notice.component';
import { EditableNoticeResolver } from './editable-notice-resolver.service';
import { AuthGuard, SharedModule } from '../shared';

const noticeRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'notice',
    component: NoticeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'notice/:slug',
    component: NoticeComponent,
    canActivate: [AuthGuard],
    resolve: {
      article: EditableNoticeResolver
    }
  }
]);

@NgModule({
  imports: [
    noticeRouting,
    SharedModule
  ],
  declarations: [
    NoticeComponent
  ],
  providers: [
    EditableNoticeResolver
  ]
})
export class NoticeModule {}
