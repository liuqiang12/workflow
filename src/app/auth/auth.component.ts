import { Component, ViewEncapsulation, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { skip } from 'rxjs/operators'
import { ActivatedRoute, Router } from '@angular/router';
import { DEFAULT_MASK_GROUP, LoadingMaskService } from '../loading-mask/index'
import { Errors, UserService,HttpService } from '../shared';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth.component.html',
  encapsulation: ViewEncapsulation.None
})
export class AuthComponent implements OnInit {
  title = 'ngx-loading-mask'

  validateForm: FormGroup
  isError = false
  isData = false
  customMessage = 'custom loading template'
  logs: string[] = []

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
    //验证的表单对象-----------------进度条----init----start
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
    this.maskService.subscribe()
      .pipe(skip(1))
      .subscribe(e => {
        const timestamp = this.isData ? `at ${new Date().getTime()}` : ''
        console.log(11111111111111111111111111)
        this.logs.push(`<span class="highlight">${e.id}</span> group in <span class="highlight">${e.status}</span> status ${timestamp}`)
      })
    //验证的表单对象-----------------进度条----init----end
    //在界面进入的时候，进度条初始化开始-----start

    const groupName = this.validateForm.get('zone').value
    this.togglePending(groupName, 0)
    //在界面进入的时候，进度条初始化开始-----end


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
    const groupName = this.validateForm.get('zone').value;
    this.togglePending(groupName, 0)
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
          this.isError = true;
          this.isSubmitting = false;
        }
      );
  }
  // 进度条的方法---------------------start----------------------
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

  /**
   * 请求数据时的方法时的精度条
   * @param {string} groupName
   */
  requestMockData(groupName: string) {
    this.logs.push(`emit <span class="highlight">${groupName}</span> group a request mock data task`)

    this.httpClient.withLoadingMask(groupName)
      .get('/assets/json/mock-data.json')
      .subscribe(e => {
        console.log(e)
      })
  }
  // 进度条的方法--------------------- end----------------------
}
