import styles from '../index.less';

type IProps = {
  title?: string;
};
export default function({ title }: IProps) {
  return <div className={styles.titleBox}>{title}</div>;
};
