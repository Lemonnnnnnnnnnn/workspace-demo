import { ProFormDateRangePicker } from '@ant-design/pro-form/es/components';
import { BasicRangePickerTypes } from '../types';

const BasicRangePicker: React.FC<BasicRangePickerTypes> = props => {
  return <ProFormDateRangePicker {...props} />;
};

export default BasicRangePicker;
