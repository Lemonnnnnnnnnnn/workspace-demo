import { ProForm } from '@ant-design/pro-components';
import BasicFormGroup from './components/BasicFormGroup';
import { Form, type FormInstance } from 'antd';
import { Children, cloneElement, forwardRef, useImperativeHandle } from 'react';
import styles from './index.less';
import {type  ProFormProps } from '@ant-design/pro-components';
import React from 'react';

export type BasicFormRef = {
  form: FormInstance<any>;
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
    <ProForm className={`${styles.BasicForm} ${className}`} submitter={false} form={form} {...restProps}>
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
