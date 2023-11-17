import { Tabs, TabsProps } from 'antd';
// import type { TabsProps as RcTabsProps } from 'rc-tabs';
import styles from './index.less';

export interface Tab {
  key: string;
  label: string;
  children?: Tab[] | React.ReactNode;
  closable?: boolean;
}

export default ({ hidenHeader = false, ...props }: TabsProps & { hidenHeader?: boolean }) => {
  const hidenHeaderClass = hidenHeader ? 'hiden-header' : '';
  return (
    <div className={`${styles.basicTabs} ${styles[hidenHeaderClass]}`}>
      <Tabs {...props}> </Tabs>
    </div>
  );
};
