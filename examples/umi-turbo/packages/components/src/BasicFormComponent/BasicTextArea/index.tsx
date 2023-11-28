import { ProFormTextArea } from "@ant-design/pro-components";

export type BasicTextAreaTypes = React.ComponentProps<typeof ProFormTextArea>;

const BasicTextArea: React.FC<BasicTextAreaTypes> = (props) => {
  let defaultPlaceholder = "请输入";
  if (typeof props.label === "string") {
    defaultPlaceholder = `请输入${props.label}`;
  }
  const { placeholder } = props;
  return (
    <ProFormTextArea
      {...props}
      placeholder={placeholder || defaultPlaceholder}
    />
  );
};

export default BasicTextArea;
