import { Col, Form, type FormInstance, Row } from "antd";
import { ProFormSwitch } from "@ant-design/pro-components";
import { type Rule, type RuleObject } from "antd/lib/form";
import { produce } from "immer";
import * as BasicComponents from "../../BasicFormComponent";
import type { ComponentConfig } from "../types";

const rowGapLayout = { xs: 8, sm: 16, md: 24 };

function isFunction(v: unknown) {
  if (typeof v === "function") return true;
  return false;
}

const coms = {
  ...BasicComponents,
  BasicSwitch: ProFormSwitch,
};

function BasicFormItem(componentConfig: ComponentConfig & { form: FormInstance }) {
  const {
    RenderFormItem,
    component = "BasicInput",
    col = 24,
    itemProps,
    form,
  } = componentConfig;
  if (component === "custom") {
    return renderCustomFormItem({ itemProps, col, RenderFormItem, form });
  } 
    const Item = coms[component];

    const rules = addonRequired({ itemProps });

    return (
      <Col span={col}>
        {/* @ts-expect-error antd-pro components 组件里报的类型错误 */}
        <Item {...itemProps} label={itemProps.label} rules={rules} />
      </Col>
    );
  
}

const renderCustomFormItem = ({
  itemProps,
  col,
  RenderFormItem,
  form,
}: Partial<ComponentConfig> & {
  form: FormInstance;
}) => {
  if (!RenderFormItem) return null;
  return (
    <Col span={col}>
      <Form.Item {...itemProps}>{RenderFormItem(form)}</Form.Item>
    </Col>
  );
};

const addonRequired = ({ itemProps }: Pick<ComponentConfig, "itemProps">) => {
  const { required, rules, label } = itemProps;

  if (hasOwnRequired(rules)) return rules;
  if (!required) return rules;

  const newRules = produce(rules || [], (draft) => {
    draft.push({
      required: true,
      message: typeof label === "string" ? `请输入${label}` : "请输入",
    });
  });

  return newRules;
};

const hasOwnRequired = (rules?: Rule[]) => {
  if (!rules) return false;
  let result = false;
  for (const rule of rules) {
    if (isFunction(rule)) {
      continue;
    } else if ((rule as RuleObject).required) {
        result = true;
        break;
      }
  }
  return result;
};

export default function({
  columns,
  form,
}: {
  columns: ComponentConfig[];
  form: FormInstance;
}) {
  return (
    <Row gutter={rowGapLayout}>
      {columns
        .filter((t) => !t.hideInColumns)
        .map((item, index) => (
          <BasicFormItem {...item} form={form} key={index} />
        ))}
    </Row>
  );
};
