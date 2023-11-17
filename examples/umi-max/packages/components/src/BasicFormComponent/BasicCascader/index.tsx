import { ProFormCascader } from '@ant-design/pro-form/es/components';
import { BasicCascaderTypes } from '../types';

export interface Option {
  value?: string | number | null;
  label: React.ReactNode;
  children?: Option[];
  isLeaf?: boolean;
}

const BasicCascader: React.FC<BasicCascaderTypes> = props => {
  return <ProFormCascader {...props} />;
};

export default BasicCascader;
