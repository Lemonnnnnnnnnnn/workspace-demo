import { ModalForm, type ModalFormProps } from "@ant-design/pro-components";
import { Button, Form, type FormInstance, type ModalProps, Spin } from "antd";
import { type Ref as ReactRef, forwardRef, useImperativeHandle } from "react";
import { type ComponentConfig } from "@/BasicForm/types";
import BasicFormRender from "../BasicForm/components/BasicFormRender";
import styles from "./index.less";

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

const BasicModalForm = <T,>(
  {
    title = "新建表单",
    children,
    columns = [],
    triggerRender,
    modalProps = {},
    titleRender = null,
    isSingleRow = true,
    loading = false,
    ...restProps
  }: BasicModalFormProps<T>,
  ref: any
) => {
  const [form] = Form.useForm();

  useImperativeHandle(ref, () => ({
    form,
  }));

  let triggerConponent = <Button type="primary">新增</Button>;

  if (typeof triggerRender === "boolean") {
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
        afterClose: () => {
          form.resetFields();
        },
        ...modalProps,
      }}
      layout={isSingleRow ? "horizontal" : "vertical"}
      submitTimeout={2000}
      {...restProps}
    >
      <Spin
        style={{ maxHeight: "none", backgroundColor: "#fff" }}
        spinning={loading}
      >
        {titleRender}
        <BasicFormRender columns={columns} form={form} />
        {children}
      </Spin>
    </ModalForm>
  );
};

export default forwardRef(BasicModalForm) as <T>(
  props: BasicModalFormProps<T> & { ref?: ReactRef<any> }
) => JSX.Element;
