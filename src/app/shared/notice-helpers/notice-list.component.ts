import { Component, Input } from '@angular/core';

import { Notice, NoticeListConfig } from '../models';
import { NoticesService } from '../services';

@Component({
  selector: 'app-notice-list',
  styleUrls: ['notice-list.component.css'],
  templateUrl: './notice-list.component.html'
})
export class NoticeListComponent {
  constructor (
    private noticesService: NoticesService
  ) {}

  @Input() limit: number;
  @Input()
  set config(config: NoticeListConfig) {
    if (config) {
      console.log("<<<<<<<<<<<<<<<<<<==========封装了查询类型和查询条件Filters============>>>>>>>>>>>>>>>")
      this.query = config;
      this.currentPage = 1;
      //查询类型、查询条件、页号
      this.runQuery();
    }
  }

  query: NoticeListConfig;
  results: Notice[];
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
    this.noticesService.query(this.query)
      .subscribe(data => {
        this.loading = false;
        this.results = data.notices;
        console.log(data)
        // Used from http://www.jstips.co/en/create-range-0...n-easily-using-one-line/
        this.totalPages = Array.from(new Array(Math.ceil(data.noticesCount / this.limit)), (val, index) => index + 1);
        console.log(this.totalPages)
      });
    console.log("resultsresultsresultsresultsresultsresultsresults")
    console.log(this.results)
  }
}
