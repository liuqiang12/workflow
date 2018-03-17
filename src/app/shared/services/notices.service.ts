import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { AppApiService } from './appApi.service';
import { Notice, NoticeListConfig } from '../models';
import { map } from 'rxjs/operators';

@Injectable()
export class NoticesService {
  constructor (
    private apiService: AppApiService
  ) {}

  query(config: NoticeListConfig): Observable<{notices: Notice[], noticesCount: number}> {
    // Convert any filters over to Angular's URLSearchParams
    const params = {};

    Object.keys(config.filters)
      .forEach((key) => {
        params[key] = config.filters[key];
      });

    return this.apiService
      .get(
        '/assets/json/articles.json' + ((config.type === 'feed') ? '/feed' : ''),
        new HttpParams(params)
      );
  }
  get(slug): Observable<Notice> {
    return this.apiService.get('/assets/json/articles/' + slug+".json")
      .pipe(map(data => {
        console.log("点击单个工单，获取工单的具体相关数据------------start")
        console.log(data.article)
        console.log(data)
        console.log("点击单个工单，获取工单的具体相关数据--------------end")
        return data.article
      }));
  }/*
  get(slug): Observable<Article> {
    return this.apiService.get('/articles/' + slug)
      .pipe(map(data => {

        return data.article
      }));
  }*/

  destroy(slug) {
    return this.apiService.delete('/articles/' + slug);
  }

  save(article): Observable<Notice> {
    // If we're updating an existing article
    if (article.slug) {
      return this.apiService.put('/articles/' + article.slug, {article: article})
        .pipe(map(data => data.article));

      // Otherwise, create a new article
    } else {
      return this.apiService.post('/articles/', {article: article})
        .pipe(map(data => data.article));
    }
  }

  favorite(slug): Observable<Notice> {
    return this.apiService.post('/articles/' + slug + '/favorite');
  }

  unfavorite(slug): Observable<Notice> {
    return this.apiService.delete('/articles/' + slug + '/favorite');
  }


}
