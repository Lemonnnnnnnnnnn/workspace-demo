import { useState, useEffect } from 'react';
import { Upload, type UploadFile,type UploadProps, message } from 'antd';
import { LoadingOutlined, PlusOutlined, EyeOutlined, DeleteOutlined } from '@ant-design/icons';
import cos from '../BasicFormComponent/BasicUpload/cos';
import moment from 'moment';
import localCache from '@/utils/localCache';
import { BasicImage } from '@/components';
import classNames from 'classnames';
import styles from './index.less';
import { type UploadChangeParam } from 'antd/lib/upload';

const defaultAccept = '.jpg,.jpeg,.png,.bmp';
const defaultFileType = ['image/jpeg', 'image/png', 'image/bmp', 'image/jpg', 'image/webp'];

export type UploadBtnProps = {
  onChange?: (...arg: any) => {};
  folderName?: string;
  sizeConfig?: { size: number; msg: string };
  value?: { fileUrl: string };
  option?: { id: string; url: string; name: string; type: string };
  label?: string;
  fileType?: string[];
} & UploadProps<any>;

export default ({
  value,
  onChange,
  label,
  folderName,
  accept = defaultAccept,
  fileType = defaultFileType,
  sizeConfig = { size: 3, msg: '3M' },
}: UploadBtnProps) => {
  const [curValue, setCurValue] = useState<UploadBtnProps['value'] | null | undefined>(null);
  const [loading, setLoading] = useState(false);
  const [maskVisible, setMaskVisible] = useState(false);
  const [previewVisible, setPreviewVisible] = useState(false);

  useEffect(() => {
    setCurValue(value);
  }, [value]);

  // 生成uuid
  const guid = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = (Math.random() * 16) | 0;
      var v = c == 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  };

  // 上传前
  const handleBeforeUpload = (file: File) => {
    if (!fileType.includes(file.type)) {
      const typeMsg = fileType
        .map(item => {
          const type = item.replace('image/', '');
          return type.toLocaleUpperCase();
        })
        .join('、');
      message.info(`图片仅支持${typeMsg}格式`);
      return false;
    }
    if (file.size / 1024 / 1024 > sizeConfig.size) {
      message.info(`图片大小不能超过${sizeConfig.msg}`);
      return false;
    }
    if (file.name.length > 255) {
      message.info('图片名称长度不能超过255个字符');
      return false;
    }
    return true;
  };

  // 上传
  const handleRequest = ({ file, onSuccess, onError }: { file: UploadFile; onSuccess: (data: any) => void; onError: (err: any) => void }) => {
    let fileArr = file.name.split('.');
    const Key = `yg/${folderName ? folderName + '/' : ''}${file.uid}-${guid()}.${fileArr[fileArr.length - 1]}`;
    cos.putObject(
      {
        Bucket: localCache.getItem('bucketName') || BUCKET,
        Region: 'ap-shanghai',
        Key,
        Body: file,
      },
      (err, data) => {
        if (err) {
          console.error(err);
          onError(err);
        } else {
          const url = `https://${data.Location}`;

          setCurValue({ fileUrl: url });
          onChange && onChange({ fileUrl: url, key: Key, fileName: file.name });
          onSuccess(Key);
        }
      },
    );
  };

  const handleChange = (value: UploadChangeParam<UploadFile<any>>) => {
    switch (value.file.status) {
      case 'uploading':
        setCurValue(null);
        setLoading(true);
        break;
      case 'error':
        message.error('上传失败');
        setLoading(false);
        break;
      case 'done':
        setLoading(false);
        break;
    }
  };

  // 控制图片遮罩
  const handleMask = (visible: boolean) => () => {
    setMaskVisible(visible);
  };

  const handleDefault = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
  };

  // 预览
  const handlePreview = () => {
    setPreviewVisible(true);
    setMaskVisible(false);
  };

  // 删除
  const handleDelete = () => {
    onChange && onChange();
    setMaskVisible(false);
  };

  return (
    <>
      <Upload
        listType="picture-card"
        accept={accept}
        showUploadList={false}
        beforeUpload={handleBeforeUpload}
        customRequest={handleRequest}
        onChange={handleChange}
      >
        {curValue ? (
          <>
            <img className={styles.img} src={curValue?.fileUrl} onMouseEnter={handleMask(true)} />
            <div className={classNames({ [styles.mask]: true, [styles.hidden]: !maskVisible })} onClick={handleDefault} onMouseLeave={handleMask(false)}>
              <EyeOutlined onClick={handlePreview} />
              <DeleteOutlined onClick={handleDelete} />
            </div>
          </>
        ) : (
          <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div className={styles.text}>{label ?? '上传'}</div>
          </div>
        )}
      </Upload>
      <BasicImage
        style={{ display: 'none' }}
        preview={{
          visible: previewVisible,
          src: curValue || '',
          onVisibleChange: value => setPreviewVisible(value),
        }}
      />
    </>
  );
};
