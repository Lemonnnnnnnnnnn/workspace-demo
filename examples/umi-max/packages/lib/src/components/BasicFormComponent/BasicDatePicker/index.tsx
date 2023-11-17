import { ProFormDatePicker } from "@ant-design/pro-components";
import { type BasicDatePickerTypes } from "../types";

const BasicDatePicker: React.FC<BasicDatePickerTypes> = (props) => {
  return <ProFormDatePicker {...props} />;
};

export default BasicDatePicker;
