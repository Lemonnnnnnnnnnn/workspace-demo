import { ProFormDatePicker } from '@ant-design/pro-form/es/components';
import { BasicDatePickerTypes } from '../types';

const BasicDatePicker: React.FC<BasicDatePickerTypes> = props => {
  return <ProFormDatePicker {...props} />;
};

export default BasicDatePicker;
