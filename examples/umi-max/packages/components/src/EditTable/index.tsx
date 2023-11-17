import { Form, FormInstance, message, Button, Popconfirm } from 'antd';
import { guid } from '@/utils';
import { PlusOutlined } from '@ant-design/icons';
import styles from './index.less';
import { useState, forwardRef, useImperativeHandle, useEffect, Ref } from 'react';
import SearchPage from '../SearchPage';
import { ProColumns, ProTableProps } from '@ant-design/pro-table';
import { FormTypeEnum } from '@/consts/enum';

export type ProEditColumns<T> = ProColumns<T> & { isViewItemRender?: boolean };

export type IProps<T, U> = {
  defaultData?: T[];
  formItems: string[];
  defaultRow?: T | null | undefined;
  hideDelete?: boolean;
  deleteRender?: ((row: T) => JSX.Element) | null;
  customAdd?: () => void;
  rowKey?: string;
  childRef?: Ref<LocationChildRef<U, T>>;
  tableType?: FormTypeEnum;
  hasAddBtn?: boolean;
  afterDelete?: (list: T[]) => void;
} & ProTableProps<any, T[]>;

export type LocationChildRef<U, T> =
  | {
      form: FormInstance<U>;
      onFinish: (args: { all?: boolean; isValidate?: boolean; title?: string }) => Promise<any>;
      customAssembly: (callBack: (list: T[]) => { data: T[]; dataCopy: T[] }) => void;
      setDefaultData: (list: T[]) => void;
      getDataSource: () => T[];
      setRow: (id: string, filedKey: string, value: any) => Promise<any>;
    }
  | undefined;

const getFiledData = (data: any, key: string) => data[key] || '-';

const EditTable = <T extends Record<string, any>, U extends Record<string, any>>({
  childRef,
  columns,
  rowKey = 'guid',
  defaultData = [],
  formItems = [],
  defaultRow,
  customAdd,
  hideDelete = false,
  deleteRender = null,
  hasAddBtn = true,
  tableType = FormTypeEnum.ADD,
  afterDelete,
}: IProps<T, U>) => {
  const [form] = Form.useForm<U>();
  const newColums: Array<ProEditColumns<T>> = [
    ...(columns?.map((t: ProEditColumns<T>) => ({
      ...t,
      render: tableType == FormTypeEnum.VIEW && !t.isViewItemRender ? (_: any, record: T) => _ : t.render,
    })) as []),
    {
      title: '操作',
      dataIndex: '',
      key: 'x',
      width: 100,
      align: 'center',
      fixed: 'right',
      hideInTable: hideDelete || tableType == FormTypeEnum.VIEW,
      render: (_, record) =>
        deleteRender ? (
          deleteRender(record)
        ) : (
          <Popconfirm title={'确认删除此行？'} placement="topRight" okText="确认" onConfirm={() => deleteRow(record)} key="disabled">
            <Button type="link" danger>
              删除
            </Button>
          </Popconfirm>
        ),
    },
  ];
  const [dataSource, setDataSource] = useState(defaultData);
  const [dataSourceCopy, setDataSourceCopy] = useState(defaultData);
  useEffect(() => {
    setDefaultData(dataSource);
  }, []);

  useImperativeHandle(childRef, () => {
    return {
      form,
      onFinish,
      customAssembly,
      setDefaultData,
      getDataSource,
      setRow,
    };
  });

  // 新增
  const addData = () => {
    if (customAdd) {
      customAdd();
      return;
    }
    const id = guid();
    const row = defaultRow ? defaultRow : ({} as T);
    const newRow: T = {
      ...row,
      [rowKey as string]: id,
    };

    setDefaultData([newRow]);
    const data = [...dataSource, newRow];
    setDataSource(data);
    setDataSourceCopy(data);
  };

  const setDefaultData = (list: T[]) => {
    setDataSource(list);
    setDataSourceCopy(list);
    const defaultFormValue = {};
    if (list.length) {
      list.forEach(item => {
        formItems.forEach(t => {
          if (item[t]) {
            defaultFormValue[`${item[rowKey as string]}-${t}`] = item[t];
          }
        });
      });
      form.setFieldsValue(defaultFormValue as Parameters<typeof form.setFieldsValue>[0]);
    }
  };

  // 删除
  const deleteRow = (row: T) => {
    const newData = dataSource.filter(t => t[rowKey as string] !== row[rowKey as string]);
    setDataSource(newData);
    setDataSourceCopy(newData);
    afterDelete && afterDelete(newData);
  };
  // 确认
  const onFinish = ({ all = true, isValidate = true, title }: { all?: boolean; isValidate?: boolean; title?: string }) => {
    return new Promise((resolve, rejecte) => {
      if (!dataSource.length && !isValidate) {
        resolve([]);
      }
      if (isValidate) {
        if (!dataSource.length) {
          message.error(`请至少填写一条${title || '数据'}`);
          rejecte();
        }
        form
          .validateFields()
          .then(values => {
            getFormResult(all, values, resolve);
          })
          .catch(err => {
            rejecte(err);
          });
      } else {
        const values = form.getFieldsValue();
        getFormResult(all, values, resolve);
      }
    });
  };

  const getDataSource = () => dataSource;
  const getFormResult = (all: boolean, values: any, resolve: (data: any) => void) => {
    const result: T[] = dataSource.map(item => {
      const formItemsObj = {};
      formItems.forEach(t => {
        const key = `${item[rowKey as string]}-${t}`;

        formItemsObj[t] = values[key];
      });
      // console.log(values,)
      return {
        ...item,
        ...formItemsObj,
      };
    });
    if (all) {
      resolve(result);
    } else {
      const newResult: T[] = result.filter(item => formItems.every(t => item[t]));
      resolve(newResult);
    }
  };

  const setRow = (id: string, filedKey: string, value: string): Promise<any> => {
    return new Promise(resolve => {
      const newFataSource = dataSource.map(t => {
        return { ...t, [filedKey]: t[rowKey] == id ? value : t[filedKey] };
      });
      const newDataSourceCopy = dataSourceCopy.map(t => {
        return { ...t, [filedKey]: t[rowKey] == id ? value : t[filedKey] };
      });
      setDataSource(newFataSource);
      setDataSourceCopy(newDataSourceCopy);
      resolve(null);
    });
  };
  // 自定义排序
  const customAssembly = async (callBack: (list: T[]) => { data: T[]; dataCopy: T[] }) => {
    const { data, dataCopy } = await callBack(dataSourceCopy);

    setDataSource(data);
    setDataSourceCopy(dataCopy);
  };
  return (
    <div className={styles.EditTable}>
      <Form form={form} scrollToFirstError name="edit-table-form">
        <Form.Item>
          <SearchPage
            search={false}
            manualRequest={true}
            columns={newColums}
            dataSource={dataSource}
            pagination={false}
            rowKey={rowKey}
            bordered
            size="small"
            options={{ fullScreen: true, density: false, reload: false }}
          />
        </Form.Item>
      </Form>
      {hasAddBtn && tableType !== FormTypeEnum.VIEW && (
        <div className={styles.addBtnBox} onClick={addData}>
          <PlusOutlined style={{ marginRight: 10 }} />
          添加一行数据
        </div>
      )}
    </div>
  );
};

export default EditTable;
