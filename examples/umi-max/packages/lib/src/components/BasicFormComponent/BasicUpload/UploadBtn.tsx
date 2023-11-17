import { useState, forwardRef, useImperativeHandle, useEffect, memo } from 'react';
import { Upload, message, Button, Spin } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import cos from './cos';
import { guid } from '@/utils';
import localCache from '@/utils/localCache';
import { UploadChangeParam, UploadFile, UploadProps } from 'antd/lib/upload';

export type UploadBtnProps = {
  onChange?: (...arg: any) => {};
  folderName?: string;
  sizeConfig?: { size: number; msg: string };
  value?: UploadFile[];
  option?: { id: string; url: string; name: string; type: string };
} & UploadProps<any>;

export type UploadRef = {
  loading: boolean;
};

const defaultOption = {
  id: 'uid',
  type: 'type',
  name: 'name',
  url: 'url',
};
export default forwardRef<UploadRef, UploadBtnProps>(
  ({ value, onChange, folderName, sizeConfig = { size: 3, msg: '3M' }, option = defaultOption, maxCount, ...otherArg }, ref) => {
    const [loading, setLoading] = useState(false);

    const [fileList, setFileList] = useState<UploadFile[]>([]);

    const [ready, setReady] = useState(false);
    useEffect(() => {
      if (value && value.length && !ready) {
        const { id, name, type, url } = option;
        let list = value.map(t => ({
          uid: t[id],
          type: t[type],
          url: t[url],
          name: t[name],
        }));
        if (maxCount) {
          list = list.filter((t, i) => i < maxCount);
        }
        setFileList(list);
        setReady(true);
      }
    }, [value]);

    useImperativeHandle(ref, () => {
      return { loading };
    });

    // 上传前
    const handleBeforeUpload = (file: File, fileList: File[]) => {
      if (loading) {
        return Upload.LIST_IGNORE;
      }
      if (file.size / 1024 / 1024 >= sizeConfig.size) {
        message.info(`图片大小不能超过${sizeConfig.msg}`);
        return Upload.LIST_IGNORE;
      }
      if (file.name.length > 255) {
        message.info('图片名称长度不能超过255个字符');
        return Upload.LIST_IGNORE;
      }
      return true;
    };

    // 上传
    const handleRequest = ({ file, onSuccess, onError }: { file: UploadFile; onSuccess: (data: any) => void; onError: (err: any) => void }) => {
      let fileArr = file?.name.split('.');
      const Key = `yg/${folderName ? folderName + '/' : ''}${file.uid}-${guid()}.${fileArr[fileArr.length - 1]}`;
      cos.putObject(
        {
          Bucket: localCache.getItem('bucketName') || BUCKET,
          Region: 'ap-shanghai',
          Key,
          Body: file,
          onProgress: function (progressData) {
            // console.log(progressData);
          },
        },
        (err, data) => {
          if (err) {
            console.error(err);
            onError && onError(err);
          } else {
            const resultFiles = [
              ...fileList,
              {
                uid: file.uid,
                type: file.type,
                name: file.name,
                url: `https://${data.Location}`,
              },
            ];

            const { id, name, type, url } = option;

            let result = resultFiles.map(t => ({ ...t, [id]: t.uid, [type]: t.name.substring(t.name.lastIndexOf('.')), [url]: t.url, [name]: t.name }));
            if (maxCount && result.length > maxCount) {
              result = result.filter((t, i) => i >= result.length - maxCount);
            }
            setFileList(result);
            onSuccess && onSuccess(result);
            onChange && onChange(result);

            // uploadPic({ platForm: 'hzt', orderId: Key, fileStore: 'COS', attExtName: Key.substring(Key.lastIndexOf('.') + 1), storePath: Key }).then(res => {
            //   if (res?.code === '000000') {
            //     onSuccess(res?.data);
            //   }
            // });
          }
        },
      );
    };

    const handleChange = (val: UploadChangeParam<UploadFile<any>>) => {
      switch (val.file.status) {
        case 'uploading':
          setLoading(true);
          break;
        case 'error':
          setLoading(false);
          message.error('上传失败');
          break;
        case 'done':
          setLoading(false);
          // onChange && onChange(fileList);

          break;
      }
    };

    const onRemove = (e: UploadFile) => {
      setFileList(files => files.filter(t => t.uid !== e.uid));
    };

    return (
      <Upload.Dragger
        beforeUpload={handleBeforeUpload}
        disabled={loading}
        fileList={fileList}
        onRemove={onRemove}
        customRequest={handleRequest}
        onChange={handleChange}
        name="files"
        {...otherArg}
      >
        <Spin spinning={loading}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">单击或拖动文件到此区域进行上传</p>
        </Spin>
      </Upload.Dragger>
    );
  },
);
