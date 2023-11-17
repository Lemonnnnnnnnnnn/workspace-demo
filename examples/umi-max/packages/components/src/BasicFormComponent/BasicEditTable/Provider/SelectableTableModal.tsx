import { ProForm } from '@ant-design/pro-form';
import BasicSelectableTableModal, { BasicSelectableTableModalProps } from '@/components/BasicSelectableTableModal';

/**
 * @description
 * 给BasicEditTable提供数据
 * 使用示例：src\pages\Test\component\TestSelectableTableModal.tsx
 *
 * @param relatedName BasicEditTable 的 formItem name
 * @param editTableRowkey BasicEditTable 的 Rowkey
 */

type Props<Resp, Req> = {
  relatedName: string;
  editTableRowkey: string;
} & Omit<BasicSelectableTableModalProps<Resp, Req>, 'rowKey'>;

const SelectableTableModal = <Resp extends Record<string, any>, Req extends Record<string, any>>({
  relatedName,
  editTableRowkey,
  ...rest
}: Props<Resp, Req>) => {
  return (
    <ProForm.Item shouldUpdate>
      {form => {
        const _data = form.getFieldValue(relatedName);
        const data = transformData(_data);

        const selectedKeys = data.map((item: any) => item[editTableRowkey]);

        return <BasicSelectableTableModal {...rest} rowKey={editTableRowkey} selectedKeys={selectedKeys} />;
      }}
    </ProForm.Item>
  );
};

export default SelectableTableModal;

const transformData = (raw: unknown) => {
  if (!raw) return [];
  if (Array.isArray(raw)) return raw;
  return [raw];
};
