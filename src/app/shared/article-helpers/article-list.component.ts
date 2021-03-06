import { Component, Input } from '@angular/core';

import { Article, ArticleListConfig } from '../models';
import { ArticlesService } from '../services';

@Component({
  selector: 'app-article-list',
  styleUrls: ['article-list.component.css'],
  templateUrl: './article-list.component.html'
})
export class ArticleListComponent {
  constructor (
    private articlesService: ArticlesService
  ) {}

  @Input() limit: number;
  @Input()
  set config(config: ArticleListConfig) {
    if (config) {
      console.log("<<<<<<<<<<<<<<<<<<==========封装了查询类型和查询条件Filters============>>>>>>>>>>>>>>>")
      this.query = config;
      this.currentPage = 1;
      //查询类型、查询条件、页号
      this.runQuery();
    }
  }

  query: ArticleListConfig;
  results: Article[];
  loading = false;
  currentPage = 1;
  totalPages: Array<number> = [1];

  setPageTo(pageNumber) {
    this.currentPage = pageNumber;
    this.runQuery();
  }

  runQuery() {
    console.log("========000000============")
    this.loading = true;
    this.results = [];

    // Create limit and offset filter (if necessary)
    if (this.limit) {
      this.query.filters.limit = this.limit;
      this.query.filters.offset =  (this.limit * (this.currentPage - 1));
    }
    console.log("========000000============")
    this.articlesService.query(this.query)
      .subscribe(data => {
        this.loading = false;
        this.results = data.articles;
        console.log(data)
        // Used from http://www.jstips.co/en/create-range-0...n-easily-using-one-line/
        this.totalPages = Array.from(new Array(Math.ceil(data.articlesCount / this.limit)), (val, index) => index + 1);
        console.log(this.totalPages)
      });
    console.log("resultsresultsresultsresultsresultsresultsresults")
    console.log(this.results)
  }
}
