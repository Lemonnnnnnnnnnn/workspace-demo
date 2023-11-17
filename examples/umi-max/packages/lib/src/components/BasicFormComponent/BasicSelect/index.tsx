import { ProFormSelect } from '@ant-design/pro-form/es/components';
import { BasicSelectTypes } from '../types';

const BasicSelect: React.FC<BasicSelectTypes> = props => {
  const defaultPlaceholder = `请输入${props.label}`;
  const { placeholder, fieldProps } = props;

  return (
    <ProFormSelect
      {...props}
      // @ts-ignore
      fieldProps={{ getPopupContainer: (triggerNode: Element) => triggerNode.parentNode, ...fieldProps }}
      placeholder={placeholder || defaultPlaceholder}
    />
  );
};

export default BasicSelect;
