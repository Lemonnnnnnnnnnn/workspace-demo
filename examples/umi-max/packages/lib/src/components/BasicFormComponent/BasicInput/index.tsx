import { ProFormText } from '@ant-design/pro-form/es/components';
import { BasicInputTypes } from '../types';

const Input: React.FC<BasicInputTypes> = props => {
  const defaultPlaceholder = `请输入${props.label}`;
  const { placeholder } = props;
  return <ProFormText {...props} placeholder={placeholder || defaultPlaceholder} />;
};

const WrappedInput = Input;

//@ts-ignore
WrappedInput.Password = ProFormText.Password;
export default WrappedInput;
