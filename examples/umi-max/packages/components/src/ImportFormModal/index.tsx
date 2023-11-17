import { Form, Upload, message, Button, FormInstance, Spin, Input } from 'antd';
import { UploadOutlined, DownloadOutlined } from '@ant-design/icons';
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import _ from 'lodash';

import { layout } from '@/consts/formlayout';
import { useDownFile } from '@/hooks';

import { BasicModal } from '@/components';
import styles from './index.less';
import FormItem from 'antd/es/form/FormItem';
interface Props {
  title?: string;
  width?: number;
  visible: boolean;
  confirmLoading?: boolean;
  onCancel: () => void;
  onInit?: (form: any) => void;
  onSubmit: (values: any) => void;
  time?: number;
  accept?: string;
  rulesMessage: string;
  customize?: boolean;
  beforeDown?: (f: FormInstance) => any;
  templateUrl?: string;
  TemplateName?: string;
  label?: string;
  loading?: boolean;
  retry?: () => Promise<string>;
  bottomRender?: React.ReactNode;
}

const ImportFormModal = forwardRef<{ form: FormInstance }, Props>((props, ref) => {
  const [form] = Form.useForm();
  const [file, setFile] = useState();
  const { loading, down } = useDownFile();

  useEffect(() => {
    if (props.visible) {
      form.resetFields();
      props.onInit && props.onInit(form);
    }
  }, [props.visible]);

  useImperativeHandle(ref, () => {
    return { form };
  });

  const onOk = () => {
    form.validateFields().then(values => {
      props.onSubmit({ ...values, file });
    });
  };

  const params = {
    accept: props.accept || '.xls,.xlsx,.csv',
    name: 'file',
    headers: {
      // authorization: 'authorization-text',
      enctype: 'multipart/form-data',
    },
    maxCount: 1,
    onChange(info: any) {
      setFile(info.file);
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} 上传成功`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} 上传失败`);
      }
    },
  };

  const normFile = (e: any) => {
    //如果是typescript, 那么参数写成 e: any
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const beforeUpload = ({ fileList }: any) => {
    return false;
  };

  return (
    <BasicModal
      maskClosable={false}
      width={props.width || 640}
      destroyOnClose
      title={props?.title || '批量添加'}
      open={props.visible}
      footer={[
        <Button key="cancel" onClick={props.onCancel}>
          取消
        </Button>,
        <Button key="sure" type="primary" loading={props?.confirmLoading} disabled={props?.confirmLoading} onClick={_.debounce(onOk, props.time || 500)}>
          确定
        </Button>,
      ]}
      onCancel={props.onCancel}
      afterClose={() => form.resetFields()}
    >
      <Spin spinning={props.loading}>
        <Form form={form} {...layout}>
          {props?.children}
          <Form.Item wrapperCol={{ span: 20 }} className={styles.inputFlex} label={props.label || '批量文件'} required>
            <Form.Item
              style={{ display: 'inline-block', width: 150, marginRight: 12, marginBottom: 0 }}
              rules={[{ required: true, message: props?.rulesMessage || '请选择文件' }]}
              name="file" // 以下两条是必须的
              valuePropName="fileList"
              // 如果没有下面这一句会报错
              getValueFromEvent={normFile}
            >
              <Upload {...params} beforeUpload={beforeUpload}>
                <Button icon={<UploadOutlined />}>选择文件</Button>
              </Upload>
            </Form.Item>
            <Form.Item style={{ display: 'inline-block', width: 150, marginRight: 12, marginBottom: 0 }}>
              {props?.customize || (
                <Button
                  icon={<DownloadOutlined />}
                  type="link"
                  loading={loading}
                  onClick={async () => {
                    if (!props?.templateUrl) {
                      const url = await props?.retry?.();

                      if (url) {
                        down(url, props.TemplateName);
                      }
                      return;
                    }
                    let pass = true;
                    props.beforeDown && (pass = props.beforeDown(form));
                    if (!pass) return;
                    down(props?.templateUrl, props.TemplateName);
                  }}
                >
                  模板下载
                </Button>
              )}
            </Form.Item>
          </Form.Item>
          {props?.bottomRender}
        </Form>
      </Spin>
    </BasicModal>
  );
});

export default ImportFormModal;
