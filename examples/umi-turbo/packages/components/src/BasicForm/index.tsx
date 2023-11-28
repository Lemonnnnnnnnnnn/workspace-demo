import { ProForm } from '@ant-design/pro-components';
import { Form, type FormInstance } from 'antd';
import React, { Children, cloneElement, forwardRef, useImperativeHandle } from 'react';
import {type  ProFormProps } from '@ant-design/pro-components';
import styles from './index.less';
import BasicFormGroup from './components/BasicFormGroup';

export type BasicFormRef = {
  form: FormInstance;
};

export type IProps = {
  children: React.ReactNode;
} & ProFormProps;

const BasicForm = forwardRef<BasicFormRef, IProps>(({ children, className, ...restProps }, ref) => {
  const [form] = Form.useForm();

  useImperativeHandle(ref, () => {
    return { form };
  });

  return (
    // <div className={styles.BasicForm}>
    <ProForm className={`${styles.BasicForm} ${className}`} form={form} submitter={false} {...restProps}>
      {Children.map(children, child => {
        if (!React.isValidElement(child)) {
          return child;
        }

        return cloneElement<any>(child, {
          form,
        });
      })}
    </ProForm>
    // </div>
  );
});

type WrappedBasicFormType = typeof BasicForm & {
  Group: typeof BasicFormGroup;
};

const WrappedBasicForm: WrappedBasicFormType = Object.assign(BasicForm, { Group: BasicFormGroup });

export default WrappedBasicForm;
