import { ProFormText } from "@ant-design/pro-components";

export type BasicInputTypes = React.ComponentProps<typeof ProFormText>;

const Input: React.FC<BasicInputTypes> = (props) => {
  let defaultPlaceholder = "请输入";
  if (typeof props.label === "string") {
    defaultPlaceholder = `请输入${props.label}`;
  }
  const { placeholder } = props;
  return (
    <ProFormText {...props} placeholder={placeholder || defaultPlaceholder} />
  );
};

export default Input;
