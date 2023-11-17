import { Form } from 'antd';
import Upload from './UploadBtn';
import { BasicUploadType } from '../types';
const BasicUpload: React.FC<BasicUploadType> = ({ fieldProps, ...props }) => {
  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
  return (
    <Form.Item shouldUpdate {...props} getValueFromEvent={normFile}>
      <Upload {...fieldProps} />
    </Form.Item>
  );
};

export default BasicUpload;
