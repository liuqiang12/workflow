import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { AppApiService } from './appApi.service';
import { map } from 'rxjs/operators';

/**
 * 服务中的重点就是动态的添加路由信息
 */
@Injectable()
export class CommentsService {
  constructor (
    private apiService: AppApiService
  ) {}

  add(slug, payload): Observable<Comment> {
    return this.apiService
      .post(
        `/articles/${slug}/comments`,
        { comment: { body: payload } }
      ).pipe(map(data => {
        console.log(data.comment)
        console.log("[------- data.comment -------]")
        return data.comment;
      }));
  }

  getAll(slug): Observable<Comment[]> {
    return this.apiService.get(`/assets/json/articles/comments/${slug}.json`)
      .pipe(map(data => {
        console.log("00000000000000000000000000000000000==:data:comments:")
        console.log(data)
        return data.comments;
      }));
  }

  destroy(commentId, articleSlug) {
    return this.apiService
      .delete(`/articles/${articleSlug}/comments/${commentId}`);
  }

}
