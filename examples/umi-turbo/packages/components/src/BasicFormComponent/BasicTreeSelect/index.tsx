import { ProFormTreeSelect } from '@ant-design/pro-components';

export type BasicTreeSelectTypes = React.ComponentProps<typeof ProFormTreeSelect>

const BasicTreeSelect: React.FC<BasicTreeSelectTypes> = props => {
  return <ProFormTreeSelect {...props} />;
};

export default BasicTreeSelect;
