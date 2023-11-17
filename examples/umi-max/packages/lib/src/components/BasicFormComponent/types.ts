import type { ProFormDigitProps } from '@ant-design/pro-form/es/components/Digit';
import type { ProFormSelectProps } from '@ant-design/pro-form/es/components/Select';
import type { ProFormSwitchProps } from '@ant-design/pro-form/es/components/Switch';
import type {
  ProFormFieldItemProps,
  ProFormFieldRemoteProps,
  FieldProps,
  LightFilterFooterRender,
  ProFormGridConfig,
  ExtendsProps,
} from '@ant-design/pro-form/es/interface';
import type { InputRef, PasswordProps } from 'antd/lib/input';
import type { InputProps, TreeSelectProps, CascaderProps, UploadProps, FormItemProps } from 'antd';
import type { DatePickerProps, MonthPickerProps, RangePickerProps, WeekPickerProps } from 'antd/lib/date-picker';
import type { TextAreaProps } from 'antd/lib/input';
import type { TextAreaRef } from 'antd/lib/input/TextArea';
import type { ProFieldProps } from '@ant-design/pro-utils';
import type { ProFormItemProps } from '@ant-design/pro-form/es/components';
import type { RefSelectProps } from 'antd/lib/select';
import { UploadBtnProps } from './BasicUpload/UploadBtn';

export type BasicDigitTypes = ProFormDigitProps & {
  label?: string;
};

type ProFormTextTypes = ProFormFieldItemProps<InputProps, InputRef>;
type PasswordTypes = ProFormFieldItemProps<PasswordProps, InputRef>;

export type BasicInputTypes = ProFormTextTypes &
  PasswordTypes & {
    label?: string;
  };

export type BasicRangePickerTypes = ProFormFieldItemProps<RangePickerProps> & {
  label?: string;
};

export type BasicSelectTypes = ProFormSelectProps & {
  label?: string;
};

export type BasicTextAreaTypes = {
  fieldProps?: (FieldProps<TextAreaRef> & TextAreaProps) | undefined;
  placeholder?: string | string[] | undefined;
  secondary?: boolean | undefined;
  cacheForSwr?: boolean | undefined;
  disabled?: boolean | undefined;
  width?: number | 'sm' | 'md' | 'xl' | 'xs' | 'lg' | undefined;
  proFieldProps?: ProFieldProps | undefined;
  footerRender?: LightFilterFooterRender | undefined;
  children?: React.ReactNode;
} & Omit<ProFormItemProps, 'valueType'> &
  Pick<ProFormGridConfig, 'colProps'> &
  ExtendsProps &
  React.RefAttributes<any> & {
    label?: string;
  };

export type BasicTreeSelectTypes = ProFormFieldItemProps<TreeSelectProps<any>, RefSelectProps> &
  ProFormFieldRemoteProps & {
    label?: string;
  };

export type BasicCascaderTypes = {
  fieldProps?: (FieldProps<any> & CascaderProps<any>) | undefined;
  placeholder?: string | string[] | undefined;
  secondary?: boolean | undefined;
  cacheForSwr?: boolean | undefined;
  disabled?: boolean | undefined;
  width?: number | 'sm' | 'md' | 'xl' | 'xs' | 'lg' | undefined;
  proFieldProps?: import('@ant-design/pro-utils').ProFieldProps | undefined;
  footerRender?: LightFilterFooterRender | undefined;
  children?: React.ReactNode;
} & Omit<ProFormItemProps, 'valueType'> &
  Pick<ProFormGridConfig, 'colProps'> &
  ExtendsProps &
  ProFormFieldRemoteProps &
  React.RefAttributes<any> & {
    label?: string;
  };

export type BasicDatePickerTypes = ProFormFieldItemProps<DatePickerProps, any> & {
  Week?: ProFormFieldItemProps<WeekPickerProps>;
  Month?: ProFormFieldItemProps<MonthPickerProps>;
  Quarter?: ProFormFieldItemProps<DatePickerProps>;
  Year?: ProFormFieldItemProps<DatePickerProps>;
} & {
  label?: string;
};

export type BasicSwitchTypes = ProFormSwitchProps;

export type BasicUploadType = {
  fieldProps?: UploadBtnProps;
} & FormItemProps;
