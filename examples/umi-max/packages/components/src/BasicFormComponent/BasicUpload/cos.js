import COS from 'cos-js-sdk-v5';
import { message } from 'antd';
import { tmpSecretInfo } from '@/services/public';

export default new COS({
  getAuthorization: (_, callback) => {
    tmpSecretInfo().then(res => {
      if (res?.code === '000000') {
        callback({
          TmpSecretId: res?.data?.credentials?.tmpSecretId,
          TmpSecretKey: res?.data?.credentials?.tmpSecretKey,
          SecurityToken: res?.data?.credentials?.sessionToken,
          StartTime: res?.data?.startTime,
          ExpiredTime: res?.data?.expiredTime,
        });
      } else {
        message.error(res?.msg || '服务器错误');
      }
    });
  },
});
