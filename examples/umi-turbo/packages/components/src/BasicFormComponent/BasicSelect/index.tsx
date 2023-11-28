import { ProFormSelect } from "@ant-design/pro-components";

export type BasicSelectTypes = React.ComponentProps<typeof ProFormSelect>;

const BasicSelect: React.FC<BasicSelectTypes> = (props) => {
  let defaultPlaceholder = "请输入";
  if (typeof props.label === "string") {
    defaultPlaceholder = `请输入${props.label}`;
  }
  const { placeholder, fieldProps } = props;

  return (
    <ProFormSelect
      {...props}
      fieldProps={{
        // @ts-expect-error 官方示例
        getPopupContainer: (triggerNode: Element) => triggerNode.parentNode,
        ...fieldProps,
      }}
      placeholder={placeholder || defaultPlaceholder}
    />
  );
};

export default BasicSelect;
