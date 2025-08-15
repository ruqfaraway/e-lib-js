import MainTable from "@/components/MainTable/MainTable";
import { Button, Col, Flex, message, Row, Table } from "antd";
import axios from "axios";
import { includes } from "lodash";
import { useRouter } from "next/router";
import React from "react";

const BooksManagement = ({ books }) => {
  const router = useRouter();
  const [messageApi, contextHolder] = message.useMessage();
  const columns = [
    {
      title: "Judul",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Penulis",
      dataIndex: "author",
      key: "author",
    },
    {
      title: "Penerbit",
      dataIndex: "publisher",
      key: "publisher",
    },
    {
      title: "Kategori",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Stok",
      dataIndex: "stock",
      key: "stock",
    },
    {
      title: "Action",
      dataIndex: "Action",
      key: "action",
      render: (text, record) => (
        <Flex justify="space-between">
          <Button
            type="link"
            onClick={() => router.push(`/books-management/detail/${record.id}`)}
          >
            Edit
          </Button>
          <Button type="link" danger onClick={() => handleDelete(record.id)}>
            Delete
          </Button>
        </Flex>
      ),
    },
  ];

  const handleDelete = async (id) => {
    return await axios
      .request({
        url: `/api/book/delete/`,
        method: "DELETE",
        data: { id },
      })
      .then((response) => {
        if (response.status === 200) {
          messageApi.success("Book deleted successfully");
          router.reload();
        }
      })
      .catch((error) => {
        messageApi.error("Failed to delete book");
        console.log(error);
      });
  };
  return (
    <>
      {contextHolder}
      <Row
        gutter={[30, 30]}
        align="middle"
        justify="space-between"
        style={{ marginBottom: "16px" }}
      >
        <Col span={24}>
          <Flex justify="end">
            <Button
              type="primary"
              onClick={() => router.push("/books-management/add")}
            >
              Add Book
            </Button>
          </Flex>
        </Col>
        <Col span={24}>
          <MainTable dataSource={books} columns={columns} />
        </Col>
      </Row>
    </>
  );
};

export default BooksManagement;

export const getStaticProps = async () => {
  const books = await prisma.book.findMany({
    include: {
      author: true,
      publisher: true,
    },
    // where: {
    //   NOT: {
    //     username: "admin",
    //   },
    // },
  });
  console.log(books);
  const formattedBooks = books.map((book) => ({
    id: book.id,
    title: book.title,
    stock: book.stock,
    author: book.author.name,
    publisher: book.publisher.name,
    category: book.category,
  }));
  // console.log(formattedBooks, "ini books");
  return {
    props: { books: formattedBooks },
    revalidate: 10,
  };
};
