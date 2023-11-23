import styles from '../index.less';
import BasicTitle from './BasicTitle';
import BasicFormRender from './BasicFormRender';
import type { FormInstance } from 'antd';
import type { ComponentConfig } from '../types';

type IProps = {
  title: string;
  form: FormInstance<any>;
  columns: ComponentConfig[];
  headerRender?: JSX.Element | boolean;
};

const BasicFormGroup: React.FC<any> = ({ title, form, columns, headerRender = true }: IProps) => {
  let Header: JSX.Element = <BasicTitle title={title} />;

  if (typeof headerRender == 'boolean') {
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
