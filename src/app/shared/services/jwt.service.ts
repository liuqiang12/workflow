import { Injectable } from '@angular/core';

/**
 *基于Token的身份验证
 * 一个JWT由3个json部分组成，通过base64Url编码后用.符号来分隔，最终的JWT形式：xxxxx.yyyyy.zzzzz
 */
@Injectable()
export class JwtService {
  /**
   *获取凭证
   * @returns {String}
   */
  getToken(): String {
    return window.localStorage['jwtToken'];
  }

  /**
   * 保存凭证
   * @param {String} token
   */
  saveToken(token: String) {
    window.localStorage['jwtToken'] = token;
  }

  /**
   * 销毁凭证
   */
  destroyToken() {
    window.localStorage.removeItem('jwtToken');
  }

}
