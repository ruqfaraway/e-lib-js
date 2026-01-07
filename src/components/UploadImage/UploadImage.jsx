import React, { useEffect, useState } from "react";
import {
  LoadingOutlined,
  PlusOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { Flex, message, Upload } from "antd";

const allowFileType = ["image/jpeg", "image/png", "image/jpg"];
const SquareUploadImage = ({ onReadyUpload, imageUrl, disabled }) => {
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    if (!!imageUrl) {
      setLoading(false);
      getBase64(imageUrl).then((value) => {
        const initState = [
          {
            uid: generateRandomKey(),
            name: "Photo",
            status: "done",
            url: value,
          },
        ];
        setFileList(initState);
      });
    }
  }, [imageUrl]);

  const getBase64 = (fileOrUrl) => {
    return new Promise((resolve, reject) => {
      if (typeof fileOrUrl === "string") {
        // If it's a URL, resolve with the URL directly
        resolve(fileOrUrl);
      } else {
        // If it's a file, read as data URL
        const reader = new FileReader();
        reader.readAsDataURL(fileOrUrl);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      }
    });
  };

  const handleRemove = () => {
    setFileList([]);
    onReadyUpload(undefined);
  };
  const beforeUpload = (file) => {
    const isJpgOrPng = allowFileType.includes(file.type);
    if (!isJpgOrPng) {
      handleRemove();
      messageError("You can only upload JPG/PNG file!");
    }

    const isLt2M = file.size / 1024 / 1024 < maxSize;
    if (!isLt2M) {
      handleRemove();
      messageError(`Image must smaller than ${maxSize}MB!`);
    }
    return false;
  };
  const handleChange = async ({ fileList: newFileList }) => {
    if (newFileList.length !== 0) {
      const currentFile = newFileList[newFileList.length - 1];
      if (allowFileType.includes(currentFile.type)) {
        // setLoading(true)
        onReadyUpload(currentFile.originFileObj).finally(() =>
          setLoading(false)
        );
      } else {
        handleRemove();
      }
    }
  };

  const uploadButton = (
    <div>
      {loading ? (
        <LoadingOutlined
          style={{
            fontSize: 28,
            color: "rgba(0,0,0,0.85)",
          }}
        />
      ) : (
        <UploadOutlined
          style={{
            fontSize: 28,
            color: "rgba(0,0,0,0.85)",
          }}
        />
      )}
      <div
        style={{
          marginTop: 8,
          color: "rgba(0,0,0,0.85)",
        }}
      >
        Upload
      </div>
    </div>
  );
  return (
    <Flex gap="middle" wrap>
      <Upload
        name="image-file"
        disabled={disabled}
        listType="picture-card"
        fileList={fileList}
        beforeUpload={beforeUpload}
        onChange={handleChange}
        onRemove={handleRemove}
      >
        {fileList.length === 0 && uploadButton}
      </Upload>
    </Flex>
  );
};
export default SquareUploadImage;
