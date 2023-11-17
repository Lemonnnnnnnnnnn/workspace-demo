import { useState, useRef } from 'react';
import { Form, Input, InputRef } from 'antd';
import styles from './index.less';

interface Props {
  name: string;
  form: any;
}

const Password: React.FC<Props> = ({ name, form }) => {
  const refPassword = useRef<InputRef>(null);
  const refInput = useRef<InputRef>(null);
  const [isPwdHidden, setIsPwdHidden] = useState(false);

  const handleChange = (type: string) => (e: any) => {
    if (type === 'hidden') {
      form.setFieldsValue({ password: e.nativeEvent.data });
      setIsPwdHidden(true);
      refPassword.current && refPassword.current.focus();
    } else if (form.getFieldValue('password').length === 0) {
      setIsPwdHidden(false);
      setTimeout(() => {
        refInput.current && refInput.current.focus();
      }, 0);
    }
  };

  return (
    <div className={styles.password}>
      <Form.Item name={name} noStyle>
        <Input.Password placeholder="请输入" ref={refPassword} onChange={handleChange('password')} readOnly={!isPwdHidden} />
      </Form.Item>
      <Form.Item noStyle>
        <Input placeholder="请输入" value="" hidden={isPwdHidden} ref={refInput} onChange={handleChange('hidden')} />
      </Form.Item>
    </div>
  );
};

export default Password;
