import { Tabs, type TabsProps } from 'antd';
import styles from './index.less';

export interface Tab {
  key: string;
  label: string;
  children?: Tab[] | React.ReactNode;
  closable?: boolean;
}

export default function({ hidenHeader = false, ...props }: TabsProps & { hidenHeader?: boolean }) {
  const hidenHeaderClass = hidenHeader ? 'hiden-header' : '';
  return (
    <div className={`${styles.basicTabs} ${styles[hidenHeaderClass]}`}>
      <Tabs {...props}> </Tabs>
    </div>
  );
};
