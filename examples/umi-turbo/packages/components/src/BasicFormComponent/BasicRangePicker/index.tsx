import { ProFormDateRangePicker } from '@ant-design/pro-components';

export type BasicRangePickerTypes = React.ComponentProps<typeof ProFormDateRangePicker>

const BasicRangePicker: React.FC<BasicRangePickerTypes> = props => {
  return <ProFormDateRangePicker {...props} />;
};

export default BasicRangePicker;
