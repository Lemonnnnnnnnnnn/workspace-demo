import { ModalForm, type ModalFormProps } from '@ant-design/pro-components';
import { Button, Form, type FormInstance, type ModalProps, Spin } from 'antd';
import { type Ref as ReactRef, forwardRef, useImperativeHandle } from 'react';
import { type ComponentConfig } from '@/BasicForm/types';
import BasicFormRender from '../BasicForm/components/BasicFormRender';
import styles from './index.less';

/**
 * @see https://procomponents.ant.design/components/modal-form
 */

export declare type FormRef = {
  form: FormInstance;
};

type BasicModalFormProps<T> = {
  title?: string;
  children?: React.ReactNode;
  columns?: ComponentConfig[];
  triggerRender?: JSX.Element | boolean;
  titleRender?: JSX.Element | null;
  modalProps?: ModalProps;
  isSingleRow?: boolean;
  visible?: boolean;
  loading?: boolean;
} & ModalFormProps<T>;

function BasicModalForm<T>(
  {
    title = '新建表单',
    children,
    columns = [],
    triggerRender,
    modalProps = {},
    titleRender = null,
    isSingleRow = true,
    loading = false,
    ...restProps
  }: BasicModalFormProps<T>,
  ref: any,
) {
  const [form] = Form.useForm();

  useImperativeHandle(ref, () => ({
    form,
  }));

  let triggerConponent: JSX.Element | undefined = (
    <Button type="primary">新增</Button>
  );

  if (typeof triggerRender === 'boolean') {
    if (!triggerRender) triggerConponent = undefined;
  } else {
    triggerConponent = triggerRender || triggerConponent;
  }

  return (
    <ModalForm<T>
      className={styles.BasicModalForm}
      form={form}
      layout={isSingleRow ? 'horizontal' : 'vertical'}
      modalProps={{
        keyboard: false,
        maskClosable: false,
        destroyOnClose: true,
        afterClose: () => {
          form.resetFields();
        },
        ...modalProps,
      }}
      submitTimeout={2000}
      title={title}
      trigger={triggerConponent}
      {...restProps}
    >
      <Spin
        spinning={loading}
        style={{ maxHeight: 'none', backgroundColor: '#fff' }}
      >
        {titleRender}
        <BasicFormRender columns={columns} form={form} />
        {children}
      </Spin>
    </ModalForm>
  );
}

export default forwardRef(BasicModalForm) as <T>(
  props: BasicModalFormProps<T> & { ref?: ReactRef<any> },
) => JSX.Element;
