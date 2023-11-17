import { ProColumns } from '@ant-design/pro-table';
import BasicModal from '../BasicModal';
import SearchPage from '../SearchPage';
import { Key, useEffect, useState } from 'react';
import { RowSelectionType } from 'antd/lib/table/interface';
import { taskList } from '@/services/public';
import _ from 'lodash';
type IProps<T> = {
  rowKey?: string;
  type?: RowSelectionType;
  columns: Array<ProColumns<T>>;
  open: boolean;
  selectRows?: T[];
  onCancel: () => void;
  onOk: (list: T[]) => void;
};

const SelectTable = <T extends Record<string, any>>({ columns, onCancel, open, onOk, selectRows = [], rowKey = 'id' }: IProps<T>) => {
  const [selectedRows, setSelectedRow] = useState<T[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);

  useEffect(() => {
    if (open) {
      console.log(selectRows);
      setSelectedRow(selectRows);
      setSelectedRowKeys(() => selectRows.map(t => t[rowKey]));
    }
  }, [open]);

  const afterClose = () => {};

  const rowSelection = {
    onChange: (selectedRowKeys: Key[], selectedRows: T[]) => {
      const data = _.uniqBy([...selectRows, ...selectedRows], item => item?.[rowKey]).filter(t => t);
      setSelectedRow(data);
      setSelectedRowKeys(() => data.map(t => t[rowKey]));
    },
    getCheckboxProps: (record: T) => ({
      disabled: selectRows.some(t => t[rowKey] == record[rowKey]),
      name: record[rowKey],
    }),
  };

  const onSubmit = () => {
    onOk && onOk(selectedRows);
    onCancel && onCancel();
  };
  return (
    <BasicModal bodyStyle={{ padding: 0 }} title="请选择" open={open} width={1000} afterClose={afterClose} onCancel={onCancel} onOk={onSubmit}>
      <SearchPage
        rowKey={rowKey}
        scroll={{ x: 700, y: 450 }}
        columns={columns}
        requestOptions={{
          getListRequest: taskList,
        }}
        // tableAlertRender={false}
        // tableAlertOptionRender={false}
        rowSelection={{
          ...rowSelection,
          selectedRowKeys,
          preserveSelectedRowKeys: true,
          alwaysShowAlert: false,
        }}
      />
    </BasicModal>
  );
};
export default SelectTable;
