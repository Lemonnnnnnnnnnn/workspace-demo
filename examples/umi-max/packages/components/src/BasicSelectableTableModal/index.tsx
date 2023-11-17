import React, { useCallback, useEffect, useMemo } from 'react';
import BasicModal from '../BasicModal';
import { ModalProps } from 'antd/es/modal';
import SearchPage, { SearchPageProps } from '../SearchPage';
import { TableRowSelection } from 'antd/lib/table/interface';
import { message } from 'antd';

/**
 * @description
 * 可选表格，在弹窗关闭时抛出新增的已选数据，外部可对已选数据进行删除（目前不支持新增同步）
 * 使用示例：src\pages\Test\component\TestBasicSelectableTableModal.tsx
 *
 * @param tableProps : 表格配置
 * @param rowKey : 行key
 * @param selectedKeys : 已选key值
 * @param callback : 回调函数，抛出已选数据
 * @param type : 单选or多选
 * @param getCheckboxProps : 自定义禁用备选项
 * @param needDisabled : 是否禁用已选项
 */

type RowSelection<Resp> = false | (TableRowSelection<Resp> & { alwaysShowAlert?: boolean | undefined }) | undefined;
type GetCheckboxProps<Resp> = TableRowSelection<Resp>['getCheckboxProps'];

export type BasicSelectableTableModalProps<Resp, Req> = {
  tableProps: SearchPageProps<Resp, Req>;
  rowKey: string;
  selectedKeys?: string[];
  callback?: (selectedRows: Resp[]) => void;
  type?: 'single' | 'multiple';
  getCheckboxProps?: GetCheckboxProps<Resp>;
  needDisabled?: boolean;
  isFilterRows?: boolean;
} & Omit<ModalProps, 'onOk'>;

const empty: string[] = [];

const BasicSelectableTableModal = <Resp extends Record<string, any>, Req extends Record<string, any>>({
  open,
  tableProps,
  rowKey,
  selectedKeys: _selectedKeys = empty,
  needDisabled = true,
  isFilterRows = true,
  ...rest
}: BasicSelectableTableModalProps<Resp, Req>) => {
  const [selectedRows = [], setSelectedRows] = React.useState<Resp[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = React.useState<React.Key[]>([]);

  useEffect(() => {
    if (needDisabled) {
      setSelectedRowKeys(_selectedKeys);
    }

    setSelectedRows([]);
  }, [_selectedKeys, needDisabled]);

  const handleOk = useCallback(
    (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
      if (selectedRowKeys.length === 0) {
        return message.info('请选择数据');
      }
      const { onCancel, callback } = rest;
      callback && callback(selectedRows);
      onCancel && onCancel(e);
    },
    [selectedRows],
  );

  const rowSelection: RowSelection<Resp> = useMemo(() => {
    const { type = 'multiple', getCheckboxProps } = rest;
    const type_ = type === 'single' ? 'radio' : 'checkbox';

    const defaultCheckBoxProps = (record: Resp) => {
      if (!needDisabled) return { disabled: false };

      if (_selectedKeys.some(key => key === record[rowKey])) {
        return { disabled: true };
      }
      return { disabled: false };
    };

    return {
      type: type_,
      selectedRowKeys,
      onChange: (selectedRowKeys: React.Key[], selectedRows: Resp[]) => {
        setSelectedRowKeys(selectedRowKeys);
        const newSelectedRows = isFilterRows ? selectedRows.filter(row => !_selectedKeys.includes(row[rowKey])) : selectedRows;
        setSelectedRows(newSelectedRows);
      },
      getCheckboxProps: getCheckboxProps || defaultCheckBoxProps,
      onSelect: (record: Resp, selected) => {
        if (type === 'multiple') {
          if (selected) {
            setSelectedRows([...selectedRows, record]);
          } else {
            setSelectedRows(selectedRows.filter(t => t[rowKey] !== record[rowKey]));
          }
        } else {
          setSelectedRows([record]);
        }
      },
    };
  }, [_selectedKeys, rest, selectedRows, needDisabled]);

  const onAfterClose = () => {
    setSelectedRowKeys([]);
    setSelectedRows([]);
  };
  return (
    <BasicModal destroyOnClose {...rest} open={open} onOk={handleOk} afterClose={onAfterClose}>
      {open && (
        <SearchPage<Resp, Req>
          rowSelection={rowSelection}
          tableAlertRender={false}
          // onRow={(_, record) => ({ onClick: () => this.setState({ selectedRows: [record] }) })}
          rowKey={rowKey}
          {...tableProps}
        />
      )}
    </BasicModal>
  );
};

export default BasicSelectableTableModal;
