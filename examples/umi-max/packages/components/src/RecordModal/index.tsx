import { useRef } from 'react';
import moment from 'moment';

import { getImportTask } from '@/services/public';
import { SearchPage, BasicModal } from '@/components';
import { ProColumns, ProTableProps } from '@ant-design/pro-table';

interface Req {
  taskType: string;
}

interface Resp {
  createTime: string;
  guid: string;
  fileUrl: string;
  fileName: string;
  failDataUrl: string;
  sumFailNum: number;
  operStatus: string;
  failFileUrl: string;
}

interface Props {
  tableProps?: ProTableProps<Resp, Req>;
  title?: string;
  onCancel?: Function;
  visible: boolean;
  // defaultColumns?: Record<string, any>;
  defaultColumns?: Array<ProColumns<any>>;
  taskType: string;
}

const RecordModal: React.FC<Props> = props => {
  const actionRef = useRef();

  const columns: Array<ProColumns<Resp>> = [
    {
      title: '批次号',
      dataIndex: 'batchNo',
      hideInSearch: true,
      width: 300,
    },
    {
      title: '批量文件',
      dataIndex: 'fileName',
      hideInSearch: true,
      width: 280,
      ellipsis: true,
      render: (text: React.ReactNode, record) => <a href={record.fileUrl}>{record.fileName}</a>,
    },
    {
      title: '总数',
      dataIndex: 'sumNum',
      hideInSearch: true,
      width: 100,
    },
    {
      title: '成功数量',
      dataIndex: 'sumSuccNum',
      hideInSearch: true,
      width: 100,
    },
    {
      title: '失败数量',
      dataIndex: 'sumFailNum',
      hideInSearch: true,
      width: 100,
      render: (text: React.ReactNode, record) =>
        record.failDataUrl && record.sumFailNum > 0 && record?.operStatus == '2' ? <a href={record.failFileUrl}>{text}</a> : <span>{text}</span>,
    },
    {
      title: '状态',
      dataIndex: 'operStatus',
      hideInSearch: true,
      width: 100,
      valueEnum: {
        0: {
          text: '待处理',
          status: 'Default',
        },
        1: {
          text: '生成中',
          status: 'Processing',
        },
        2: {
          text: '成功',
          status: 'Success',
        },
        3: {
          text: '失败',
          status: 'Error',
        },
      },
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'dateRange',
      width: 200,
      search: {
        transform: (value: string[]) => ({ startTime: value[0], endTime: value[1] }),
      },
      fieldProps: { getPopupContainer: (triggerNode: any) => triggerNode.parentNode },
      render: (_: React.ReactNode, record) => (record.createTime ? moment(record.createTime).format('YYYY-MM-DD HH:mm:ss') : '-'),
    },
    {
      title: '开始处理时间',
      dataIndex: 'createTime',
      valueType: 'dateTime',
      width: 200,
      hideInSearch: true,
    },
    {
      title: '处理完成时间',
      dataIndex: 'updateTime',
      valueType: 'dateTime',
      width: 200,
      hideInSearch: true,
    },
    {
      title: '操作人',
      dataIndex: 'createOperName',
      hideInSearch: true,
      width: 160,
      ellipsis: true,
    },
  ];

  return (
    <BasicModal
      size="biglarge"
      destroyOnClose
      title={props?.title || '批量新增记录'}
      visible={props.visible}
      onCancel={() => {
        props.onCancel && props.onCancel();
      }}
      footer={null}
    >
      <SearchPage<Resp, Req>
        actionRef={actionRef}
        hasMagin={false}
        rowKey={(record: Resp) => record.guid}
        options={false}
        // @ts-ignore
        toolBarRenderItems={[]}
        params={{ taskType: props.taskType }}
        scroll={{ x: 950, y: 450 }}
        requestOptions={{
          getListRequest: getImportTask,
        }}
        columns={props?.defaultColumns || columns}
        {...props.tableProps}
        // pagination={{ defaultPageSize: 5, showQuickJumper: true }}
      />
    </BasicModal>
  );
};

export default RecordModal;
