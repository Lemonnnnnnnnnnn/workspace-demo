import { ProFormTreeSelect } from '@ant-design/pro-form/es/components';
import { BasicTreeSelectTypes } from '../types';

const BasicTreeSelect: React.FC<BasicTreeSelectTypes> = props => {
  return <ProFormTreeSelect {...props} />;
};

export default BasicTreeSelect;
