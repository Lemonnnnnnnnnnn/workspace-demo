import { ProFormDatePicker } from "@ant-design/pro-components";

export type BasicDatePickerTypes = React.ComponentProps<typeof ProFormDatePicker>

const BasicDatePicker: React.FC<BasicDatePickerTypes> = (props) => {
  return <ProFormDatePicker {...props} />;
};

export default BasicDatePicker;
