import type { FormInstance } from 'antd';
import styles from '../index.less';
import type { ComponentConfig } from '../types';
import BasicTitle from './BasicTitle';
import BasicFormRender from './BasicFormRender';

type IProps = {
  title: string;
  form: FormInstance;
  columns: ComponentConfig[];
  headerRender?: JSX.Element | boolean;
};

const BasicFormGroup = ({ title, form, columns, headerRender = true }: IProps) => {
  let Header: JSX.Element = <BasicTitle title={title} />;

  if (typeof headerRender === 'boolean') {
    if (!headerRender) Header = <></>;
  } else {
    Header = headerRender;
  }

  return (
    <div className={styles.BasicFormGroup}>
      {Header}
      <BasicFormRender form={form} columns={columns} />
    </div>
  );
};

export default BasicFormGroup;
