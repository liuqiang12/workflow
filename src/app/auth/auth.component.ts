import { Component, ViewEncapsulation, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { skip } from 'rxjs/operators'
import { HttpService } from '../http.service'
import { ActivatedRoute, Router } from '@angular/router';
import { DEFAULT_MASK_GROUP, LoadingMaskService } from '../loading-mask/index'
import { Errors, UserService } from '../shared';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit {
  title = 'ngx-loading-mask'

  validateForm: FormGroup
  isError = false
  isData = false
  isCustom = false
  customMessage = 'custom loading template'
  defaultGroup = DEFAULT_MASK_GROUP
  logs: string[] = []

  timeoutMarks = {
    1: '1s',
    2: '2s',
    3: '3s',
    4: '4s',
    5: '5s'
  }


  authType: string = '';
  errors: Errors = {errors: {}};
  isSubmitting = false;
  authForm: FormGroup;

  constructor(
    public maskService: LoadingMaskService,
    private httpClient: HttpService,

    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder
  ) {
    // use FormBuilder to create a form group
    this.authForm = this.fb.group({
      'email': ['', Validators.required],
      'password': ['', Validators.required]
    });
  }

  ngOnInit() {
    //验证的表单对象
    this.validateForm = this.fb.group({
      zone: [DEFAULT_MASK_GROUP],
      isData: [false],
      isError: [false],
      isCustom: [false],
      customMessage: [this.customMessage],
      errorMessage: ['foo'],
      timeout: [1],
      count: [1]
    })
    // ---------------  属性的监听信息----start----------
    this.validateForm.get('customMessage').valueChanges
      .subscribe(e => {
        this.customMessage = e
      })

    this.validateForm.get('isCustom').valueChanges
      .subscribe(e => {
        this.isCustom = e
      })

    this.validateForm.get('isError').valueChanges
      .subscribe(e => {
        this.isError = e
      })

    this.validateForm.get('isData').valueChanges
      .subscribe(e => {
        this.isData = e
      })
    // ---------------  属性的监听信息----end----------
    this.maskService.subscribe()
      .pipe(skip(1))
      .subscribe(e => {
        const timestamp = this.isData ? `at ${new Date().getTime()}` : ''
        console.log(11111111111111111111111111)
        this.logs.push(`<span class="highlight">${e.id}</span> group in <span class="highlight">${e.status}</span> status ${timestamp}`)
      })

    this.route.url.subscribe(data => {
      // Get the last piece of the URL (it's either 'login' or 'register')
      this.authType = data[data.length - 1].path;
      // Set a title for the page accordingly
      this.title = (this.authType === 'login') ? '登录' : '注册';
      // add form control for username if this is the register page
      if (this.authType === 'register') {
        this.authForm.addControl('username', new FormControl());
      }
    });
  }

  /**
   * 注册和登录方法
   */
  submitForm() {
    /* 这里需要增加进度条 */
    this.logs = []

    const count = this.validateForm.get('count').value
    const groupName = this.validateForm.get('zone').value
    console.log(this.isData)
    if (this.isData) {
      this.requestMockData(groupName)
    } else {
      this.togglePending(groupName, 0)

      for (let i = 0; i < count - 1; i++) {
        const delay = Math.random() * 3

        setTimeout(() => {
          this.togglePending(groupName, delay)
        }, delay * 1000)
      }
    }

    this.isSubmitting = true;
    this.errors = {errors: {}};
    //用户凭证
    const credentials = this.authForm.value;
    this.userService
      .attemptAuth(this.authType, credentials)
      .subscribe(
          //跳转到首页
        data => this.router.navigateByUrl('/'),
        //错误信息:提示和正在提交标志
        err => {
          this.errors = err;
          this.isSubmitting = false;
        }
      );
  }

  /**
   *
   * @param {string} groupName
   * @param {number} delay
   */
  togglePending(groupName: string, delay: number) {
    const timeout = this.validateForm.get('timeout').value * 1000
    const errorMessage = this.validateForm.get('errorMessage').value

    const delayLog = delay > 0 ? `After ${delay.toFixed(2)}s, ` : ''

    this.logs.push(`${delayLog} emit <span class="highlight">${groupName}</span> group a <span class="highlight">${timeout}s</span> task`)

    this.maskService.showGroup(groupName)

    setTimeout(() => {
      if (this.isError) {
        this.toggleDoneWithError(groupName, errorMessage)
      } else {
        this.toggleDone(groupName)
      }
    }, timeout)
  }

  toggleDone(groupName: string) {
    this.maskService.hideGroup(groupName)
  }

  toggleDoneWithError(groupName: string, error) {
    this.maskService.hideGroupError(groupName, error)
  }

  requestMockData(groupName: string) {
    this.logs.push(`emit <span class="highlight">${groupName}</span> group a request mock data task`)

    this.httpClient.withLoadingMask(groupName)
      .get('/assets/mock-data.json')
      .subscribe(e => {
        console.log(e)
      })
  }


}
