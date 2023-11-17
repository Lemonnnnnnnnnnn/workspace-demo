import type { EditableFormInstance, ProColumns, ActionType } from '@ant-design/pro-table';
import { ProForm } from '@ant-design/pro-form';
import EditableProTable from '@ant-design/pro-table/es/components/EditableTable';
import React, { useMemo, useRef, useState, useEffect } from 'react';
import { FormInstance } from 'antd/node_modules/rc-field-form/es/interface';
import { guid } from '@/utils';
import { Table } from 'antd';
import { BasicEditTableProps } from './index';
import bigNumber from 'bignumber.js';

export type Columns<T> = (ProColumns<T> & { summary?: boolean })[];

/**
 *
 * @param form 父级form实例
 * @param initKeys 初始选中的行key
 * @returns
 */

type RendererProps<T, U extends Record<string, any>> = BasicEditTableProps<T, U> & {
  form: FormInstance;
  initKeys: string[];
};

const Renderer = <T extends Record<string, any>, U extends Record<string, any>>({
  form,
  columns,
  name,
  rowKey,
  disabled = false,
  creatorButtonText = '新增一行',
  customAddButtonRenderer,
  hasSummary = false,
  optionWidth = '25%',
  actionRef: _actionRef,
  initKeys,
  tableProps,
  editorFormRef: _editorFormRef,
  ...itemProps
}: RendererProps<T, U>) => {
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
  const editorFormRef = _editorFormRef ? _editorFormRef : useRef<EditableFormInstance<T>>();
  const actionRef = _actionRef ? _actionRef : useRef<ActionType>(null);

  useEffect(() => {
    setEditableRowKeys(initKeys);
  }, [initKeys]);

  const recordCreatorProps = useMemo(() => {
    if (disabled) return false;
    if (customAddButtonRenderer) return false;
    return {
      position: 'bottom',
      record: () => ({ [rowKey]: guid() }),
      newRecordType: 'dataSource',
      creatorButtonText,
    };
  }, [creatorButtonText, customAddButtonRenderer]);

  const getSummary = (pageData: readonly T[]) => {
    if (!hasSummary) return undefined;

    return (
      <Table.Summary.Row>
        {columns.map((item, key) => {
          if (!item.summary) {
            return (
              <Table.Summary.Cell key={key} index={key}>
                {key === 0 ? '总计' : ''}
              </Table.Summary.Cell>
            );
          }

          return (
            <Table.Summary.Cell key={key} index={key}>
              {getColumnSummary(item.dataIndex, pageData)}
            </Table.Summary.Cell>
          );
        })}
      </Table.Summary.Row>
    );

    function getColumnSummary(dataIndex?: string | number | (string | number)[], pageData: readonly T[] = []) {
      if (!dataIndex) return 0;
      if (Array.isArray(dataIndex)) return 0;

      const summary = pageData.reduce((total, item) => {
        const val = item[dataIndex] || 0;

        return total.plus(Number(val));
      }, new bigNumber(0));

      return summary.toNumber();
    }
  };

  return (
    <>
      <ProForm.Item name={name} {...itemProps}>
        <EditableProTable<T>
          rowKey={rowKey}
          actionRef={actionRef}
          editableFormRef={editorFormRef}
          // @ts-ignore ，官方示例用法
          recordCreatorProps={recordCreatorProps}
          columns={columns}
          summary={getSummary}
          editable={{
            type: 'multiple',
            editableKeys,
            onChange: setEditableRowKeys,

            actionRender: (row, config, defaultDom) => {
              if (disabled) return [];
              return [defaultDom.delete];
            },
            onValuesChange: (record, recordList) => {
              form?.setFieldsValue({ [name]: recordList });
            },
          }}
          {...tableProps}
        />
      </ProForm.Item>
      {customAddButtonRenderer && customAddButtonRenderer(form, actionRef)}
    </>
  );
};

export default Renderer;
