import { ProFormSelect } from '@ant-design/pro-components';

export type BasicSelectTypes = React.ComponentProps<typeof ProFormSelect>

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
