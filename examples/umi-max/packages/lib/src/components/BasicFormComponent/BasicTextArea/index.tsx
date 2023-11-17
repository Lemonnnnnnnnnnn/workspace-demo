import { ProFormTextArea } from '@ant-design/pro-form/es/components';
import { BasicTextAreaTypes } from '../types';

const BasicTextArea: React.FC<BasicTextAreaTypes> = props => {
  const defaultPlaceholder = `请输入${props.label}`;
  const { placeholder } = props;
  return <ProFormTextArea {...props} placeholder={placeholder || defaultPlaceholder} />;
};

export default BasicTextArea;
