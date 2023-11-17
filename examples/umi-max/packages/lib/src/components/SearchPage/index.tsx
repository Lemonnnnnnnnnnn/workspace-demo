import ProTable, { ProTableProps } from '@ant-design/pro-table';
import { message, Button, Tooltip } from 'antd';
import { guid } from '@/utils';
import { useExport } from '@/hooks';
import { Access, useAccess } from 'umi';
import React, { useMemo, useState } from 'react';
import { createAndExport } from '@/services/public';
import { PLATFORM_CODE } from '@/consts/enum';
import { CreateAndExportRequest } from '@/insterface/public';

const fileNameOption = {
  currentPage: 'currentPage',
  total: 'totalSize',
  pageSize: 'pageSize',
  current: 'currentNum',
};

const options: RequestOptions = {
  getListRequest: () => Promise.resolve([]),
  requestDataFormat: () => ({
    data: [],
    total: 0,
    pageSize: 0,
    current: 0,
  }),
  fileNameOption,
};

const exportConfigDefault = {
  accessKey: '',
  exportRun: () => {},
  params: {},
  paramJsonParams: {},
  exportRunFnLoading: false,
};

interface RequestOptions {
  getListRequest: (...params: any[]) => Promise<any>;
  fileNameOption?: { currentPage: string; total: string; pageSize: string; current: string };
  requestDataFormat?: (res: any) => {
    data: any[];
    total: number | string;
    pageSize: number | string;
    current: number | string;
  };
}

export type SearchPageProps<T, U> = Omit<ProTableProps<T, U>, 'toolBarRender'> & {
  toolBarRenderItems?: Array<JSX.Element>;
  hasMagin?: boolean;
  requestOptions?: RequestOptions;
  requestCallBack?: (params: any) => void;
  exportConfig?: {
    accessKey: string;
    exportRun?: (params: CreateAndExportRequest) => void;
    params?: Record<string, any>;
    paramJsonParams?: Record<string, any>;
    exportRunFnLoading?: boolean;
  };
};

const SearchPage = <Resp extends Record<string, any>, Req extends Record<string, any>>({
  hasMagin = true,
  requestOptions = options,
  exportConfig = exportConfigDefault,
  toolBarRenderItems = [],
  columns: _columns,
  requestCallBack,
  ...restProps
}: SearchPageProps<Resp, Req>) => {
  const access = useAccess();
  const [query, setQuery] = useState({});

  const columns = useMemo(() => {
    if (!_columns) return [];
    return _columns?.map(item => {
      return { ellipsis: true, ...item };
    });
  }, [_columns]);

  const request = (params: Record<string, any>) => {
    const { getListRequest, requestDataFormat, fileNameOption: fileNameConfig } = requestOptions;
    const { currentPage, total, pageSize, current } = fileNameConfig || fileNameOption;
    const newParams = { ...params, [currentPage]: params.current };
    setQuery(newParams);
    requestCallBack && requestCallBack(newParams);
    return getListRequest(newParams).then(res => {
      if (res?.code === '000000') {
        if (requestDataFormat) {
          return requestDataFormat(res);
        }
        return {
          data: res?.data?.map((item: Record<string, any>) => ({ guid: guid(), ...item })) || [],
          total: res.pager?.[total],
          pageSize: res.pager?.[pageSize],
          current: res.pager?.[current],
        };
      } else {
        message.error(res.msg);
        return {
          data: [],
          total: 0,
          pageSize: 0,
          current: 0,
        };
      }
    });
  };

  const { exportRun, exportRunLoading } = useExport(exportConfig.exportRun || createAndExport);

  const exportRunFn = () => {
    exportRun({ ...exportConfig.params, paramJson: JSON.stringify({ ...query, ...exportConfig.paramJsonParams }), webType: PLATFORM_CODE });
  };
  return (
    <ProTable
      style={{ margin: hasMagin ? 16 : 0 }}
      search={{ labelWidth: 120, showHiddenNum: true }}
      scroll={{ x: 1000 }}
      rowKey="guid"
      columns={columns}
      revalidateOnFocus={false}
      options={{ fullScreen: true, density: false }}
      pagination={{ showQuickJumper: true, showSizeChanger: true, defaultPageSize: 10 }}
      request={request}
      toolBarRender={() => [
        <Access accessible={access[exportConfig.accessKey]} key="accessExport">
          <Button type="primary" key="export" onClick={exportRunFn} loading={exportConfig.exportRunFnLoading || exportRunLoading}>
            导出
          </Button>
        </Access>,
        ...toolBarRenderItems,
      ]}
      {...restProps}
    />
  );
};

export default SearchPage;
