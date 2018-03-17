import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Notice, NoticesService } from '../shared';

@Component({
  selector: 'app-notice-page',
  templateUrl: './notice.component.html'
})
export class NoticeComponent implements OnInit {
  notice: Notice = {} as Notice;
  noticeForm: FormGroup;
  tagField = new FormControl();
  errors: Object = {};
  isSubmitting = false;

  constructor(
    private noticesService: NoticesService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {
    // use the FormBuilder to create a form group
    this.noticeForm = this.fb.group({
      title: '',
      description: '',
      body: '',
    });
    // Optional: subscribe to value changes on the form
    // this.noticeForm.valueChanges.subscribe(value => this.updateNotice(value));
  }

  ngOnInit() {
    // If there's an notice prefetched, load it
    this.route.data.subscribe(
      (data: {notice: Notice}) => {
        if (data.notice) {
          this.notice = data.notice;
          this.noticeForm.patchValue(data.notice);
        }
      }
    );
  }

  addTag() {
    // retrieve tag control
    const tag = this.tagField.value;
    // only add tag if it does not exist yet
    if (this.notice.tagList.indexOf(tag) < 0) {
      this.notice.tagList.push(tag);
    }
    // clear the input
    this.tagField.reset('');
  }

  removeTag(tagName: string) {
    this.notice.tagList = this.notice.tagList.filter((tag) => tag !== tagName);
  }

  submitForm() {
    this.isSubmitting = true;

    // update the model
    this.updateArticle(this.noticeForm.value);

    // post the changes
    this.noticesService
      .save(this.notice)
      .subscribe(
        article => this.router.navigateByUrl('/notice/' + article.slug),
        err => {
          this.errors = err;
          this.isSubmitting = false;
        }
      );
  }

  updateArticle(values: Object) {
    Object.assign(this.notice, values);
  }
}
