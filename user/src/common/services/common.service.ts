import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonService {
  /**
   * Create random string
   * @param {number} length
   * @param {string|null} type
   * @return {string}
   */
  public generateRandomString(length: number, type: string = null): string {
    let charSet = '';
    let randomString = '';
    if (type === 'number') {
      charSet = '123456789';
    } else {
      charSet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz';
    }

    for (let i = 0; i < length; i++) {
      const randomPoz = Math.floor(Math.random() * charSet.length); //nosonar
      randomString += charSet.substring(randomPoz, randomPoz + 1);
    }
    return randomString;
  }
}
