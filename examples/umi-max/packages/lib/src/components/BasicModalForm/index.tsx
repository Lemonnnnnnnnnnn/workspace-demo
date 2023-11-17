import { ModalForm, ModalFormProps } from '@ant-design/pro-form/es/layouts/ModalForm';
import { Button, Form, FormInstance, Row, Col, ModalProps, Spin } from 'antd';
import { Ref as ReactRef, forwardRef, useImperativeHandle, useCallback } from 'react';
import styles from './index.less';
import type { ComponentConfig } from '@/components/BasicForm/types';
import { formItemLayout } from '@/consts/formlayout';
import { BasicFormRender } from '@/components';

/**
 * @see https://procomponents.ant.design/components/modal-form
 */

export declare type FormRef = {
  form: FormInstance<any>;
};

type BasicModalFormProps<T> = {
  title?: string;
  children?: React.ReactNode;
  columns?: ComponentConfig[];
  triggerRender?: JSX.Element | boolean;
  titleRender?: JSX.Element | null;
  modalProps?: ModalProps;
  grid?: boolean;
  isSingleRow?: boolean;
  visible?: boolean;
  loading?: boolean;
} & ModalFormProps<T>;

const BasicModalForm = <T,>(
  {
    title = '新建表单',
    children,
    columns = [],
    triggerRender,
    modalProps = {},
    grid = true,
    titleRender = null,
    isSingleRow = true,
    loading = false,
    ...restProps
  }: BasicModalFormProps<T>,
  ref: any,
) => {
  const [form] = Form.useForm();

  useImperativeHandle(ref, () => ({
    form,
  }));

  let triggerConponent = <Button type="primary">新增</Button>;

  if (typeof triggerRender == 'boolean') {
    if (!triggerRender) triggerConponent = <></>;
  } else {
    triggerConponent = triggerRender || triggerConponent;
  }

  return (
    <ModalForm<T>
      title={title}
      className={styles.BasicModalForm}
      trigger={triggerConponent}
      form={form}
      modalProps={{
        keyboard: false,
        maskClosable: false,
        destroyOnClose: true,
        afterClose: () => form.resetFields(),
        ...modalProps,
      }}
      {...formItemLayout}
      layout={isSingleRow ? 'horizontal' : 'vertical'}
      submitTimeout={2000}
      {...restProps}
    >
      <Spin style={{ maxHeight: 'none', backgroundColor: '#fff' }} spinning={loading}>
        {titleRender}
        <BasicFormRender columns={columns} form={form} />
        {children}
      </Spin>
    </ModalForm>
  );
};

export default forwardRef(BasicModalForm) as <T>(props: BasicModalFormProps<T> & { ref?: ReactRef<any> }) => JSX.Element;
