import { useEffect, useState, forwardRef, useImperativeHandle } from "react";

import {
  ZoomInOutlined,
  ZoomOutOutlined,
  UndoOutlined,
  RedoOutlined,
  DownloadOutlined,
} from "@ant-design/icons";

import styles from "./index.less";

const iconStyle = { color: "#fff", fontSize: 20 };

export type ImagePreviewRef = {
  open: () => void;
  close: () => void;
};

export default forwardRef<
  ImagePreviewRef,
  { imgSrc: string; imgName?: string; maskClosable?: boolean }
>(({ imgSrc, imgName = "preview", maskClosable = true }, ref) => {
  const [visible, setVisible] = useState(false);

  const [imgScale, setImgScale] = useState("100%");

  const [imgCurrent, setImgCurrent] = useState(0);

  const [imgTransform, setImgTransform] = useState("");

  //放大
  const imgToBigger = () => {
    const a = parseInt(imgScale) + 5 + "%";
    setImgScale(a);
  };
  //缩小
  const imgToSmaller = () => {
    const a = parseInt(imgScale) + -5 + "%";
    setImgScale(a);
  };
  //左旋转
  const imgToLeftRoll = () => {
    const a = (imgCurrent - 90) % 360;
    setImgCurrent(a);
    setImgTransform("rotate(" + a + "deg)");
  };
  //右旋转
  const imgToRightRoll = () => {
    const a = (imgCurrent + 90) % 360;

    setImgCurrent(a);
    setImgTransform("rotate(" + a + "deg)");
  };
  // 下载
  const downloadImage = () => {
    const xhr = new XMLHttpRequest();
    const url = imgSrc;
    xhr.responseType = "blob";
    xhr.onload = function () {
      if (xhr.status == 200) {
        const blob = this.response;
        const a: HTMLAnchorElement = document.createElement("a");

        a.setAttribute("style", "display:none");

        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onload = function (e) {
          a.download = `${imgName}.jpg`;
          a.setAttribute("href", e.target?.result as string);
          document.body.append(a);
          a.click();
          a.remove();
        };
      }
    };
    xhr.open("get", url, true);
    xhr.send();
  };

  useEffect(() => {
    if (!visible) {
      closeImagePreviewModel();
    }
  }, [visible]);
  const open = () => setVisible(true);
  const close = () => setVisible(false);

  useImperativeHandle(ref, () => {
    return {
      open,
      close,
    };
  });
  const closeImagePreviewModel = () => {
    setImgCurrent(0);
    setImgScale("100%");
    setImgTransform("");
  };
  const maskClick = () => {
    if (maskClosable) close();
  };

  return (
    <div
      className={styles.previewBox}
      style={{ display: visible ? "flex" : "none" }}
    >
      <div className={styles.mask} onClick={maskClick}></div>
      <img
        src={imgSrc}
        style={{
          width: "auto",
          height: "auto",
          maxWidth: "100vw",
          maxHeight: "calc(100vh - 158px)",
          position: "relative",
          margin: "0 auto",
          scale: imgScale,
          transform: imgTransform,
        }}
      />
      <div className={styles.footer}>
        <button onClick={imgToBigger}>
          <ZoomInOutlined style={iconStyle} />
        </button>
        <button onClick={imgToSmaller}>
          <ZoomOutOutlined style={iconStyle} />
        </button>
        <button onClick={imgToLeftRoll}>
          <UndoOutlined style={iconStyle} />
        </button>
        <button onClick={imgToRightRoll}>
          <RedoOutlined style={iconStyle} />
        </button>
        <button onClick={downloadImage}>
          <DownloadOutlined style={iconStyle} />
        </button>
      </div>
    </div>
  );
});
