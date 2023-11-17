import { LogisticsResponse } from '@/insterface/business';
import BasicModal from '../BasicModal';
import { Result, Timeline, message } from 'antd';
import { useRequest } from 'umi';
import { logistics } from '@/services/business';
import { useEffect, useState } from 'react';
import { SmileOutlined } from '@ant-design/icons';
import moment from 'moment';
import styles from './index.less';

const statusEnum = {
  '0': '已下单',
  '1': '仓库已接单',
  '2': '仓库处理中',
  '3': '已出库',
  '4': '已发货',
  '5': '干线运输中',
  '6': '清关中',
  '7': '已揽件',
  '8': '运输中',
  '9': '派送中',
  '10': '驿站派送中',
  '11': '包裹异常',
  '12': '待提货',
  '13': '已签收',
  '14': '已拒收',
  '15': '其它',
};

const showEnum = Object.keys(statusEnum).filter((t: string) => !['8'].includes(t));

export default ({ open, onCancel, logisticsOrderNo }: { open: boolean; logisticsOrderNo: string; onCancel?: () => void }) => {
  const [list, setList] = useState<LogisticsResponse['data']>([]);
  moment.updateLocale('zh-cn', {
    meridiem: function (hour, minute, isLowercase) {
      if (hour < 9) {
        return '早上';
      } else if (hour < 11) {
        return '上午';
      } else if (hour < 13) {
        return '中午';
      } else if (hour < 18) {
        return '下午';
      } else {
        return '晚上';
      }
    },
  });
  useEffect(() => {
    if (open) {
      logisticsRun({ logisticsOrderNo });
    }
  }, [open]);

  const { run: logisticsRun, loading: logisticsLoading } = useRequest(logistics, {
    manual: true,
    onSuccess: res => {
      if (res?.code == '000000') {
        setList(res.data.reverse());
      } else {
        message.error(res?.msg || '服务器错误');
      }
    },
  });

  const LabelNode = ({ time, location }: { time: string; location: string }) => {
    const formatDate = (time: string): string => {
      if (moment(time).isSame(moment(), 'days')) {
        return moment(time).format('a HH:mm:ss');
      }
      if (moment(time).isSame(moment().subtract(1, 'days'), 'days')) {
        return moment(time).format('昨日 HH:mm:ss');
      }
      return time;
    };

    return (
      <div>
        <div style={{ color: '#818181' }}>{formatDate(time)}</div>
        <div style={{ color: '#818181' }}>{location}</div>
      </div>
    );
  };

  return (
    <BasicModal
      open={open}
      bodyStyle={{ maxHeight: 700 }}
      title="查看物流"
      onCancel={onCancel}
      loading={logisticsLoading}
      size="large"
      footer={false}
      className={styles.LogisticsModal}
    >
      {list.length ? (
        <Timeline mode="left">
          {list.map((item, index) => {
            return (
              <Timeline.Item key={index} label={<LabelNode time={item.time} location={item.location} />} color={Boolean(index) ? 'gray' : 'green'}>
                {Boolean(item.status) && showEnum.includes(item.status) && <span className={item.status}>{statusEnum[item.status]}</span>}
                <div className={styles.context}>{item.context}</div>
              </Timeline.Item>
            );
          })}
        </Timeline>
      ) : (
        <Result icon={<SmileOutlined />} title="暂时没有数据" />
      )}
    </BasicModal>
  );
};
