import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { Article, NoticesService, UserService } from '../shared';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class EditableNoticeResolver implements Resolve<Article> {
  constructor(
    private noticesService: NoticesService,
    private router: Router,
    private userService: UserService
  ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {

    return this.noticesService.get(route.params['slug'])
      .pipe(
        map(
          article => {
            if (this.userService.getCurrentUser().username === article.author.username) {
              return article;
            } else {
              this.router.navigateByUrl('/');
            }
          }
        ),
        catchError((err) => this.router.navigateByUrl('/'))
      );
  }
}
