import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { ApiService } from './api.service';
import { AppApiService } from './appApi.service';
import { Article, ArticleListConfig } from '../models';
import { map } from 'rxjs/operators';

@Injectable()
export class ArticlesService {
  constructor (
    /*private apiService: ApiService,*/
    private apiService: AppApiService
  ) {}

  query(config: ArticleListConfig): Observable<{articles: Article[], articlesCount: number}> {
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
  get(slug): Observable<Article> {
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

  save(article): Observable<Article> {
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

  favorite(slug): Observable<Article> {
    return this.apiService.post('/articles/' + slug + '/favorite');
  }

  unfavorite(slug): Observable<Article> {
    return this.apiService.delete('/articles/' + slug + '/favorite');
  }


}
