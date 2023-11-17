import CryptoJS from 'crypto-js';
import { message } from 'antd';
import { history } from 'umi';
import localCache from '@/utils/localCache';

const defaultKey = '6tghb7in225rthyy';
const defaultIv = '1as47u3b50ot5hyy';

export default {
  /* 加密 */
  encryption: (data, key = defaultKey, iv = defaultIv) =>
    CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(data), CryptoJS.enc.Utf8.parse(key), {
      iv: CryptoJS.enc.Utf8.parse(iv),
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    }).toString(),
  /* 解密 */
  decryption(data, key = defaultKey, iv = defaultIv) {
    try {
      const baseResult = CryptoJS.enc.Base64.parse(data);
      const ciphertext = CryptoJS.enc.Base64.stringify(baseResult);
      const decryptResult = CryptoJS.AES.decrypt(ciphertext, CryptoJS.enc.Utf8.parse(key), {
        iv: CryptoJS.enc.Utf8.parse(iv),
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      });
      return CryptoJS.enc.Utf8.stringify(decryptResult).toString();
    } catch (err) {
      // 多人登录同一个账号,导致秘钥刷新,旧秘钥解密失败,需要重新登录
      localCache.clear();
      history.push('/login');
      message.error('登录失效,请重新登录!');
      console.log('解密失败');
      return null;
    }
  },
  /* 验签参数 */
  setSign(obj, secret) {
    const ser = secret;
    function objKeySort(obj) {
      const newkey = Object.keys(obj).sort();
      const newObj = {};
      for (let i = 0; i < newkey.length; i++) {
        if (obj[newkey[i]] !== '' && obj[newkey[i]] !== null) {
          newObj[newkey[i]] = obj[newkey[i]];
        }
      }
      return newObj;
    }
    const reobj = objKeySort(obj); // 排序后的对象
    let recode = '';
    for (const key in reobj) {
      if (reobj[key] instanceof Object) {
        reobj[key] = JSON.stringify(reobj[key], this.replacer);
      }
      recode += key + reobj[key];
    }
    recode = ser + recode + ser;
    const sign = String(CryptoJS.MD5(recode)).toUpperCase(); // 转大写的字符串
    return sign;
  },
  /* 格式化生成timestamp */
  showTime() {
    var date = new Date();
    var Year = date.getFullYear();
    var Month = date.getMonth() + 1; // 获取系统月份，由于月份是从0开始计算，所以要加1
    Month < 10 ? (Month = '0' + Month) : Month;
    var Dates = date.getDate();
    Dates < 10 ? (Dates = '0' + Dates) : Dates;
    var Hour = date.getHours();
    Hour < 10 ? (Hour = '0' + Hour) : Hour;
    var Minute = date.getMinutes();
    var Second = date.getSeconds();
    Minute < 10 ? (Minute = '0' + Minute) : Minute;
    Second < 10 ? (Second = '0' + Second) : Second;
    return '' + Year + Month + Dates + Hour + Minute + Second;
  },
  /* 随机生成16位key和iv */
  createAesKey() {
    const expect = 16;
    let str = Math.random().toString(36).substr(2);
    while (str.length < expect) {
      str += Math.random().toString(36).substr(2);
    }
    str = str.substr(0, 16);
    return str;
  },
  /* 删除序列化 null undefined NaN 值 */
  replacer(_, value) {
    if (!value && typeof value !== 'undefined' && value !== 0) {
      return '';
    }
    return value;
  },
};
