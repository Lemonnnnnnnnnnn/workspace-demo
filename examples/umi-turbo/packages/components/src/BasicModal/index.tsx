import { Modal, Spin } from "antd";
import { type ModalProps } from "antd";
import { useState } from "react";
import styles from "./index.less";

interface Props {
  size?: "small" | "middle" | "large" | "biglarge";
  bodyHeight?: number | string;
  onOk?: (e: React.MouseEvent<HTMLElement>) => Promise<any>;
  loading?: boolean;
  hasLoading?: boolean;
}

const BasicModal: React.FC<ModalProps & Props> = ({
  size,
  bodyHeight,
  loading,
  children,
  hasLoading = true,
  onOk: _onOk,
  confirmLoading,
  ...restProps
}) => {
  const [btnLoading, setBtnLoading] = useState(false);

  const onOk = (e: React.MouseEvent<HTMLElement>) => {
    if (!_onOk) return;
    setBtnLoading(true);
    const result = _onOk(e);

    if (result instanceof Promise) {
      void result
        .finally(() => {
          setBtnLoading(false);
        });
    } else {
      setBtnLoading(false);
    }
  };

  return (
    <Modal
      className={styles.BasicModal}
      confirmLoading={confirmLoading || btnLoading}
      destroyOnClose
      keyboard={false}
      maskClosable={false}
      okText="确认"
      onOk={onOk}
      width={
        (size === "small" && 600) ||
        (size === "middle" && 800) ||
        (size === "large" && 1000) ||
        (size === "biglarge" && 1200) ||
        undefined
      }
      {...restProps}
      bodyStyle={{
        height: bodyHeight,
        overflow: "auto",
        ...restProps.bodyStyle,
      }}
    >
      {hasLoading ? (
        <Spin
          spinning={loading === true}
          style={{
            maxHeight: "none",
            height: bodyHeight ? Number(bodyHeight) - 48 : "none",
            backgroundColor: "#fff",
          }}
        >
          {children}
        </Spin>
      ) : (
        children
      )}
    </Modal>
  );
};

export default BasicModal;
