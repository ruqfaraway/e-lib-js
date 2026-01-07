import SquareUploadImage from "@/components/UploadImage/UploadImage";
import prisma from "@/lib/prisma";
import {
  Button,
  Flex,
  Form,
  Input,
  InputNumber,
  message,
  Select,
  Typography,
} from "antd";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";

const AddBooks = ({ author, publisher }) => {
  const router = useRouter();
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const [imageUrl, setImageUrl] = useState();
  const handleOnFinish = async (values) => {
    return await axios
      .request({
        method: "POST",
        url: "/api/book/add",
        data: values,
      })
      .then((response) => {
        if (response.status === 201) {
          messageApi.success("Book created successfully");
          router.push("/books-management");
        }
      })
      .catch((error) => {
        messageApi.error("Failed to create book");
        console.error("Error:", error);
      });
  };

  const handleUpload = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await axios.request({
        url: "/api/upload",
        method: "POST",
        data: formData,
      });
      if (response.status === 200) {
        const imageUrl = response.data.url;
        form.setFieldValue("coverImage", imageUrl);
        setImageUrl(imageUrl);
        messageApi.success("Upload successful");
      }
    } catch (error) {
      console.error("Upload error:", error);
      messageApi.error("Upload failed");
    }
  };
  return (
    <>
      {contextHolder}
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 12 }}
        labelAlign="left"
        form={form}
        onFinish={handleOnFinish}
      >
        <Form.Item>
          <Typography.Title level={4}>Form Tambah Buku</Typography.Title>
        </Form.Item>
        <Form.Item
          label="Judul"
          name="title"
          rules={[{ required: true, message: "Please input your title!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Kategori"
          name="category"
          rules={[{ required: true, message: "Please input your category!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Deskripsi"
          name="description"
          rules={[
            { required: true, message: "Please input your description!" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Tahun Terbit"
          name="publishYear"
          rules={[
            { required: true, message: "Please input your tahun terbit!" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="ISBN"
          name="isbn"
          rules={[{ required: true, message: "Please input your ISBN!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Penulis"
          name="authorId"
          rules={[{ required: true, message: "Please input your author ID!" }]}
        >
          <Select options={author} />
        </Form.Item>
        <Form.Item
          label="Penerbit"
          name="publisherId"
          rules={[{ required: true, message: "Please input your author ID!" }]}
        >
          <Select options={publisher} />
        </Form.Item>
        <Form.Item
          label="Stok"
          name="stock"
          rules={[{ required: true, message: "Please input your stock!" }]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          label="Cover Image"
          name="coverImage"
          rules={[{ required: true, message: "Please input your image!" }]}
        >
          <SquareUploadImage imageUrl={imageUrl} onReadyUpload={handleUpload} />
        </Form.Item>
        <Form.Item wrapperCol={{ span: 16 }}>
          <Flex justify="end" gap="middle">
            <Button>Back</Button>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Flex>
        </Form.Item>
      </Form>
    </>
  );
};

export default AddBooks;

export const getStaticProps = async () => {
  const author = await prisma.author.findMany({
    // where: {
    //   NOT: {
    //     username: "admin",
    //   },
    // },
  });
  const publisher = await prisma.publisher.findMany({});
  const DROPDOWN_PUBLISHER = publisher.map((publisher) => ({
    value: publisher.id,
    label: publisher.name,
  }));
  console.log(DROPDOWN_PUBLISHER);
  // console.log(author);
  const DROPDOWN_AUTHOR = author.map((author) => ({
    value: author.id,
    label: author.name,
  }));
  // console.log(formattedAuthors, "ini author");
  return {
    props: { author: DROPDOWN_AUTHOR, publisher: DROPDOWN_PUBLISHER },
    revalidate: 10,
  };
};
