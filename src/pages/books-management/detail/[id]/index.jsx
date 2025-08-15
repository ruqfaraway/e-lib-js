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
import React from "react";

const UpdateBooks = ({ author, publisher, book }) => {
  const router = useRouter();
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const handleOnFinish = async (values) => {
    return await axios
      .request({
        method: "POST",
        url: `/api/book/update/${book.id}`,
        data: values,
      })
      .then((response) => {
        if (response.status === 200) {
          messageApi.success("Book updated successfully");
          router.push("/books-management");
        }
      })
      .catch((error) => {
        messageApi.error("Failed to update book");
        console.error("Error:", error);
      });
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
        initialValues={book}
      >
        <Form.Item>
          <Typography.Title level={4}>Form Update Buku</Typography.Title>
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
          <InputNumber disabled />
        </Form.Item>
        <Form.Item wrapperCol={{ span: 16 }}>
          <Flex justify="end" gap="middle">
            <Button onClick={() => router.back()}>Back</Button>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Flex>
        </Form.Item>
      </Form>
    </>
  );
};

export default UpdateBooks;

export const getServerSideProps = async ({ params }) => {
  const author = await prisma.author.findMany({});
  const publisher = await prisma.publisher.findMany({});
  const book = await prisma.book.findUnique({
    where: {
      id: Number(params.id),
    },
  });
  // console.log(book, "book");
  const DROPDOWN_PUBLISHER = publisher.map((publisher) => ({
    value: publisher.id,
    label: publisher.name,
  }));
  // console.log(DROPDOWN_PUBLISHER);
  // console.log(author);
  const DROPDOWN_AUTHOR = author.map((author) => ({
    value: author.id,
    label: author.name,
  }));
  const serializedBook = book
    ? {
        ...book,
        createdAt: book.createdAt?.toISOString() ?? null,
        updatedAt: book.updatedAt?.toISOString() ?? null,
        publishedDate: book.publishedDate?.toISOString() ?? null, // kalau ada field ini
      }
    : null;
  // console.log(formattedAuthors, "ini author");
  return {
    props: {
      author: DROPDOWN_AUTHOR,
      publisher: DROPDOWN_PUBLISHER,
      book: serializedBook,
    },
  };
};
