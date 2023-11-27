import { Col, Form, type FormInstance, Row } from "antd";
import type { ComponentConfig } from "../types";
import * as BasicComponents from "../../BasicFormComponent";
import { ProFormSwitch } from "@ant-design/pro-components";
import { type Rule, type RuleObject } from "antd/lib/form";
import { produce } from "immer";

const rowGapLayout = { xs: 8, sm: 16, md: 24 };

function isFunction(v: unknown) {
  if (typeof v === "function") return true;
  return false;
}

const coms = {
  ...BasicComponents,
  BasicSwitch: ProFormSwitch,
};

const BasicFormItem = (
  componentConfig: ComponentConfig & { form: FormInstance }
) => {
  const {
    RenderFormItem,
    component = "BasicInput",
    col = 24,
    itemProps,
    form,
  } = componentConfig;
  if (component === "custom") {
    return renderCustomFormItem({ itemProps, col, RenderFormItem, form });
  } else {
    const Item = coms[component];

    const rules = addonRequired({ itemProps });

    return (
      <Col span={col}>
        {/* @ts-expect-error antd-pro components 组件里报的类型错误 */}
        <Item {...itemProps} label={itemProps.label} rules={rules} />
      </Col>
    );
  }
};

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
    } else {
      if ((rule as RuleObject).required) {
        result = true;
        break;
      }
    }
  }
  return result;
};

export default ({
  columns,
  form,
}: {
  columns: ComponentConfig[];
  form: FormInstance<any>;
}) => {
  return (
    <Row gutter={rowGapLayout}>
      {columns
        .filter((t) => !t.hideInColumns)
        .map((item, index) => (
          <BasicFormItem {...item} key={index} form={form} />
        ))}
    </Row>
  );
};
