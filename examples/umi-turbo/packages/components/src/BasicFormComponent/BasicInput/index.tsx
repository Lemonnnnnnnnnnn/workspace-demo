import { ProFormText } from '@ant-design/pro-components';

export type BasicInputTypes = React.ComponentProps<typeof ProFormText>

const Input: React.FC<BasicInputTypes> = props => {
  const defaultPlaceholder = `请输入${props.label}`;
  const { placeholder } = props;
  return <ProFormText {...props} placeholder={placeholder || defaultPlaceholder} />;
};

export default Input;
