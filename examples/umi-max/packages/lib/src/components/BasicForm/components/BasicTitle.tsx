import styles from '../index.less';

type IProps = {
  title?: string;
};
export default ({ title }: IProps) => {
  return <div className={styles.titleBox}>{title}</div>;
};
