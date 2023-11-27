import type { ProFormSwitchProps } from '@ant-design/pro-components';
import {
  type BasicDigitTypes,
  type BasicInputTypes,
  type BasicSelectTypes,
  type BasicRangePickerTypes,
  type BasicTreeSelectTypes,
  type BasicCascaderTypes,
  type BasicDatePickerTypes,
  type BasicTextAreaTypes,
} from '../BasicFormComponent';
import { type FormInstance, type FormItemProps } from 'antd';

/**
 * RenderFormItem: 自定义渲染组件，包裹在Form.Item内
 * hideInColumns: 完全隐藏(不可见，表单中也没有这个值)，用于条件渲染组件
 * itemProps:{hidden: true} : 部分隐藏(visibility:hidden，表单中存在这个值)
 * col : 占用的栅格列
 */
export type ComponentConfig = {
  RenderFormItem?: (form: FormInstance) => React.ReactNode;
  hideInColumns?: boolean;
  hideInDisplay?: boolean;
  col?: number;
} & (
    BasicDigitConfig
    | BasicInputConfig
    | BasicSelectConfig
    | BasicRangePickerConfig
    | BasicTreeSelectConfig
    | BasicCascaderConfig
    | BasicDatePickerConfig
    | BasicTextAreaConfig
    | BasicSwtichConfig
    | CustomConfig
  );

export type CommonComponent = BasicDigitConfig['component']
  | BasicInputConfig['component']
  | BasicSelectConfig['component']
  | BasicRangePickerConfig['component']
  | BasicTreeSelectConfig['component']
  | BasicCascaderConfig['component']
  | BasicDatePickerConfig['component']
  | BasicTextAreaConfig['component']
  | BasicSwtichConfig['component']


type BasicDigitConfig = {
  component: 'BasicDigit';
  itemProps: BasicDigitTypes;
};


type BasicInputConfig = {
  component: 'BasicInput';
  itemProps: BasicInputTypes;
};


type BasicSelectConfig = {
  component: 'BasicSelect';
  itemProps: BasicSelectTypes;
};


type BasicRangePickerConfig = {
  component: 'BasicRangePicker';
  itemProps: BasicRangePickerTypes
};


type BasicTreeSelectConfig = {
  component: 'BasicTreeSelect';
  itemProps: BasicTreeSelectTypes;
};


type BasicCascaderConfig = {
  component: 'BasicCascader';
  itemProps: BasicCascaderTypes;
};


type BasicDatePickerConfig = {
  component: 'BasicDatePicker';
  itemProps: BasicDatePickerTypes;
};


type BasicTextAreaConfig = {
  component: 'BasicTextArea';
  itemProps: BasicTextAreaTypes;
};


type BasicSwtichConfig = {
  component: 'BasicSwitch';
  itemProps: ProFormSwitchProps;
};

type CustomConfig = {
  component: 'custom';
  itemProps: FormItemProps & {
    fieldProps?: Record<string , any>;
  };
};
