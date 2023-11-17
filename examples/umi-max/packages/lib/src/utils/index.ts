import { message } from 'antd';
import _, { isNil, omitBy } from 'lodash';
import localCache from './localCache';
import { CompanyTypeEnum, UserTypeEnum, baseSwitchEnum } from '@/consts/enum';
import { Ref } from 'react';
import { FormInstance } from 'antd/es/form/Form';
import { CheckTokenUserInfoResponse } from '@/insterface/public';
import { EditableFormInstance } from '@ant-design/pro-table';

export const guid = (): string => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0;
    var v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};


type optionsValueType<T> = T extends true ? number : string;
type optionsReturnType<T> = {
  label: any;
  value: T;
}[];
// 从字典对象中获取select组件的options值
export const getOptionsFromDict = <T extends boolean>(enumObj: Record<string, any>, keyIsNumber?: T): optionsReturnType<optionsValueType<T>> => {
  return Object.entries(enumObj).map(([key, value]) => {
    const key_ = keyIsNumber ? Number(key) : key;
    return {
      label: value,
      value: key_ as optionsValueType<T>,
    };
  });
};

// 将前一个函数的执行结果传入下一个函数，用法参考Ramda.pipe
export function pipe(...rest: Function[]) {
  return function executer(...params: any[]) {
    if (!rest.length) return params;

    const fn = rest.shift() as Function;

    return doExecute(fn(...params), ...rest);
  };
}

function doExecute(params: any, ...rest: Function[]) {
  if (!rest.length) return params;

  const fn = rest.shift() as Function;

  return doExecute(fn(params), ...rest);
}

// 过滤undefined数值
export function filterUndefined(data: Record<string, any>) {
  return omitBy(data, isNil);
}

// 校验数据是否为空
export const isInvalid = (data: unknown) => {
  if (isNil(data) || data === '') return true;
  return false;
};

/**
 * 字符串数字转数字
 * @param v 数字
 * @returns
 */
export const fomratStringNumber = (v: string | number): number => {
  return isNaN(Number(v)) ? 0 : Number(v);
};

/**
 *
 * @param form 表单实例
 * @param fieldName 表单字段
 * @param leftV 向右位移
 * @param topV 向下位移
 */
export const scrollToField = (form: FormInstance | EditableFormInstance, fieldName: string, leftV?: number, topV?: number) => {
  form.scrollToField(fieldName, {
    behavior: actions => {
      actions.forEach(({ el, top, left }) => {
        el.scrollTop = top + (topV || 0);
        el.scrollLeft = left + (leftV || 0);
      });
    },
  });
};
