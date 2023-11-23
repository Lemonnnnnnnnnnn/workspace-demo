// import { ProFormDigit } from '@ant-design/pro-form/es/components';
import { ProFormDigit } from "@ant-design/pro-components";
import { produce } from "immer";

export type BasicDigitTypes = React.ComponentProps<typeof ProFormDigit>

const DEFAULT_MAX = 999999999.99;


const BasicDigit: React.FC<BasicDigitTypes> = (props) => {
  const { fieldProps: _fieldProps, ...rest } = props;
  const fieldProps = addFieldProps(_fieldProps);

  return <ProFormDigit fieldProps={fieldProps} {...rest} />;
};

type FieldProps = BasicDigitTypes["fieldProps"];

function addFieldProps(fieldProps: FieldProps) {
  const newFieldProps = fieldProps || {};

  return addDefaultMax(newFieldProps);
}

function addDefaultMax(fieldProps: Exclude<FieldProps, undefined>) {
  return produce(fieldProps, (draft: { max: number; }) => {
    if (draft.max) return;
    draft.max = DEFAULT_MAX;
  });
}

export default BasicDigit;
