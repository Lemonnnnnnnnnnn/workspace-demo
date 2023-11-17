export const DEFAULT_MAX = 999999999.99;

export const REG =  {
    /* 以字母开头，6-20位字母、数字的组合 */
    loginId: /^[a-zA-Z](?=.*\d)[a-zA-Z0-9]{5,19}$/,
  
    /* 手机号 */
    userTel: /^1[3-9]\d{9}$/,
  
    /* 8-20位大小写字母和数字的结合 */
    password: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,20}$/,
  
    /* 18位大小写字母和数字 */
    crpIdCard: /^[a-zA-Z0-9]{1,18}$/,
  
    /* 大小写字母和数字的结合 */
    certificateId: /^[A-Za-z0-9]+$/,
  
    taxRegistrationCertNo: /^(\d{15}|\d{18})$/,
  
    /* 营业执照注册号 */
    mbrBusiCode: /^([0-9]{15})$/,
  
    /* 营业执照注册号三证合一 */
    mbrBusiCodeUnity: /^([123456789ABCDEFGY]{1})([1239]{1})([0-9]{6})([0-9ABCDEFGHIJKLMNOPQRSTUVWXYZ]{9})([0-9ABCDEFGHJKLMNPQRTUWXY])$/,
  
    /* 仅限 数字 */
    onlyNumber: /^\d+$|^\d+[.]?\d+$/,
  
    /* 座机电话 */
    mob: /^0?[0][3|4|5|8][0-9]\d{9}$/,
    email:
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  
    // 正整数或两位小数
    intOrPart: /^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/,
  
    //正整数
    integer: /^[1-9]\d*$/,
  
    /* 正整数 */
    positiveInteger: /^[0-9]*[1-9][0-9]*$/,
  
    // 固定电话和手机号
    fixedAndNumber: /^(((\d{3,4}-)?[0-9]{7,8})|(1(3|4|5|6|7|8|9)\d{9}))$/,
  };
  