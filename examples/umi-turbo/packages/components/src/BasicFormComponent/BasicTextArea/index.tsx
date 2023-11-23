import { ProFormTextArea } from '@ant-design/pro-components';

export type BasicTextAreaTypes = React.ComponentProps<typeof ProFormTextArea>

const BasicTextArea: React.FC<BasicTextAreaTypes> = props => {
  const defaultPlaceholder = `请输入${props.label}`;
  const { placeholder } = props;
  return <ProFormTextArea {...props} placeholder={placeholder || defaultPlaceholder} />;
};

export default BasicTextArea;
