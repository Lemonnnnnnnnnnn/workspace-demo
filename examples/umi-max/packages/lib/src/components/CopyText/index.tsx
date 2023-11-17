import copy from 'copy-to-clipboard';
import { CopyOutlined } from '@ant-design/icons';
import { message } from 'antd';

import { LogisticsModal } from '@/components';
import { useState } from 'react';
export default ({ text = [] }: { text: string[] }) => {
  const [open, setOpen] = useState(false);

  const [logisticsOrderNo, setLogisticsOrderNo] = useState('');
  const copyText = (t: string) => {
    copy(t);
    message.success('复制成功');
  };

  const showLogistics = (t: string) => {
    setLogisticsOrderNo(t);
    setOpen(true);
  };
  return (
    <>
      <div>
        {text.map((t, i) => {
          return (
            <div key={i}>
              <span style={{ cursor: 'pointer', color: '#4245F3' }} onClick={() => showLogistics(t)}>
                {t}
              </span>
              <CopyOutlined onClick={() => copyText(t)} style={{ color: '#4245F3', marginLeft: 5 }} />
            </div>
          );
        })}
      </div>
      {open && <LogisticsModal open={open} onCancel={() => setOpen(false)} logisticsOrderNo={logisticsOrderNo} />}
    </>
  );
};
