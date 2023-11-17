import type { ProColumns, ActionType, EditableFormInstance } from '@ant-design/pro-table';
import { ProFormInstance } from '@ant-design/pro-form/es/BaseForm/BaseForm';
import { ProForm, ProFormItemProps } from '@ant-design/pro-form';
import React, { ReactNode } from 'react';
import { FormInstance } from 'antd/node_modules/rc-field-form/es/interface';
import { pipe } from '@/utils';
import styles from './index.less';
import { Popconfirm } from 'antd';
import Renderer from './Renderer';
import { produce } from 'immer';
import type { EditableProTableProps } from '@ant-design/pro-table/es/components/EditableTable';

export type BasicEditTableColumns<T> = (ProColumns<T> & { summary?: boolean; required?: boolean })[];

export type BasicEditTableProps<T, U extends Record<string, any>> = {
  name: string;
  rowKey: string;
  columns: BasicEditTableColumns<T>;
  disabled?: boolean;
  creatorButtonText?: ReactNode;
  customAddButtonRenderer?: (form: FormInstance<any>, actionRef: React.RefObject<ActionType>) => ReactNode;
  hasSummary?: boolean;
  optionWidth?: string | number;
  tableProps?: EditableProTableProps<T, U>;
  actionRef?: React.RefObject<ActionType>;
  editorFormRef?: React.RefObject<EditableFormInstance<T>>;
} & ProFormItemProps;

/**
 * @description:
 * 基础表格和Form表单强关联使用
 * 使用方法参考：
 * 简单使用：src\pages\Test\component\TestBasicEditTable.tsx
 * 复杂使用：src\pages\CommodityManage\CommodityManage\components\EditModal\CostUnitPrice.tsx
 *
 * @param columns 每列数据
 * @param BtnPosition 新增按钮的位置
 * @param name FormItem的name
 * @param rowKey 每行的key值
 * @param disabled 是否禁用
 * @param hasSummary 是否有汇总行
 * @param optionWidth 操作栏宽度
 * @param tableProps 表格属性
 * @param actionRef 操作实例
 * @param editorFormRef editTable内部也是一个Form组件，所以可以直接获取实例
 * @returns
 *
 * FAQ:
 * 1. 如果数据不存在主键rowKey？
 * 使用 @/utils/guid 生成主键，并通过 Form.setFieldValue 设置表单值
 * 2. 如何禁用编辑/删除？
 * - 禁用整个表格：传入disabled值为true
 * - 局部禁用：设置表单值，将要禁用的行的 disabled 值设为true状态，如 [{foo : 1 , disabled : true} , {foo : 2},...]
 * 3. 如何让某个cell不可编辑？
 * 设置 columns 中的 editable 为 false
 */

const BasicEditTable = <T extends Record<string, any>, U extends Record<string, any>>({
  columns: _columns,
  name,
  disabled = false,
  hasSummary = false,
  optionWidth = '25%',
  rowKey,
  ...itemProps
}: BasicEditTableProps<T, U>) => {
  const getColumns = (formRef: any) => {
    const addOnOptions_ = addOnOptions.bind(null, formRef);

    return pipe(addOnOptions_, addOnSummary)(_columns);
  };

  function addOnOptions(formRef: ProFormInstance<any>, columns: BasicEditTableColumns<T>) {
    const options: ProColumns<T> = {
      title: '操作',
      valueType: 'option',
      width: optionWidth,
      align: 'center',
      fixed: 'right',
      render: (text, record, _, action) => {
        if (disabled) return null;
        if (record.disabled) return null;

        return [
          <Popconfirm
            title={'删除此行？'}
            okText="确定"
            cancelText="取消"
            onConfirm={() => {
              const tableDataSource = formRef?.getFieldValue(name) as T[];
              const targetKey = record[rowKey];

              preCheck(tableDataSource, rowKey, targetKey);

              formRef?.setFieldsValue({
                [name]: tableDataSource.filter(item => item[rowKey] !== targetKey),
              });
            }}
          >
            <a key="delete">删除</a>
          </Popconfirm>,
        ];
      },
    };

    const newColumns = produce(columns, (draft: BasicEditTableColumns<T>) => {
      draft.push(options);
    });

    return newColumns;
  }

  function addOnSummary(columns: BasicEditTableColumns<T>) {
    if (!hasSummary) return columns;

    const options: ProColumns<T> = {
      title: '',
      render: () => null,
      editable: false,
      width: 50,
      dataIndex: '__header',
      fixed: 'left',
    };

    const newColumns = produce(columns, (draft: BasicEditTableColumns<T>) => {
      draft.unshift(options);
    });

    return newColumns;
  }

  return (
    <ProForm.Item shouldUpdate className={styles['basic-edit-table']}>
      {form => {
        const initData = form.getFieldValue(name) || [];
        const initKeys = initData.map((item: T) => item[rowKey]);
        return (
          <Renderer
            rowKey={rowKey}
            initKeys={initKeys}
            disabled={disabled}
            hasSummary={hasSummary}
            name={name}
            columns={getColumns(form)}
            form={form}
            {...itemProps}
          />
        );
      }}
    </ProForm.Item>
  );
};

export default BasicEditTable;

const preCheck = <T extends Array<any>>(data: T, rowKey: string, targetKey: string) => {
  if (data.every(item => item[rowKey] !== targetKey)) {
    throw new Error('未找到要删除的行，请检查数据rowKey是否存在');
  }
};
