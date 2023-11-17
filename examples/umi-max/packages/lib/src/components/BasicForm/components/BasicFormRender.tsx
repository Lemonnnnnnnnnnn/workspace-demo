import { Col, Form, type FormInstance, Row } from 'antd';
import type { ComponentConfig } from '../types';
import * as BasicComponents from '@/BasicFormComponent';
import { ProFormCascader, ProFormSwitch } from '@ant-design/pro-components';
import { CustomRequired } from '@/utils/type';
import { isFunction } from 'lodash';
import { type Rule } from 'antd/lib/form';
import { produce } from 'immer';

const rowGapLayout = { xs: 8, sm: 16, md: 24 };

const coms = {
  ...BasicComponents,
  BasicCascader: ProFormCascader,
  BasicSwitch: ProFormSwitch,
};

const BasicFormItem = (componentConfig: ComponentConfig & { form: FormInstance<any> }) => {
  const { RenderFormItem, component = 'BasicInput', col = 24, itemProps, form } = componentConfig;
  if (isCustomFormITem(componentConfig)) {
    // @ts-expect-error
    return renderCustomFormItem({ itemProps, col, RenderFormItem, form });
  } else {
    const Item = coms[component];
    const rules = addonRequired({ itemProps });

    return (
      <Col span={col}>
        <Item {...itemProps} label={itemProps.label} rules={rules} />
      </Col>
    );
  }
};

const isCustomFormITem = ({ component, RenderFormItem }: ComponentConfig) => {
  return component === 'custom' && RenderFormItem;
};

const renderCustomFormItem = ({ itemProps, col, RenderFormItem, form }: CustomRequired<ComponentConfig, 'RenderFormItem'> & { form: FormInstance<any> }) => {
  const { fieldProps: _fieldProps } = itemProps;

  return (
    <Col span={col}>
      <Form.Item {...itemProps}>{RenderFormItem(form)}</Form.Item>
    </Col>
  );
};

const addonRequired = ({ itemProps }: Pick<ComponentConfig, 'itemProps'>) => {
  const { required, rules, label } = itemProps;

  if (hasOwnRequired(rules)) return rules;
  if (!required) return rules;

  const newRules = produce(rules || [], draft => {
    draft.push({
      required: true,
      message: `请输入${label}`,
    });
  });

  return newRules;
};

const hasOwnRequired = (rules?: Rule[]) => {
  if (!rules) return false;
  let result = false;
  for (let rule of rules) {
    if (isFunction(rule)) continue;
    if (rule.required) {
      result = true;
      break;
    }
  }
  return result;
};

export default ({ columns, form }: { columns: ComponentConfig[]; form: FormInstance<any> }) => {
  return (
    <Row gutter={rowGapLayout}>
      {columns
        .filter(t => !t.hideInColumns)
        .map((item, index) => (
          <BasicFormItem {...item} key={index} form={form} />
        ))}
    </Row>
  );
};
