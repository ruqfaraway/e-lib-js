import MainTable from "@/components/MainTable/MainTable";
import { Button, Col, Flex, message, Row, Table } from "antd";
import axios from "axios";
import { useRouter } from "next/router";
import React from "react";

const AuthorManagement = ({ author }) => {
  const router = useRouter();
  const [messageApi, contextHolder] = message.useMessage();
  const columns = [
    {
      title: "No",
      dataIndex: "key",
      key: "key",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Penulis",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      width: 150,
      render: (text, record) => (
        <Flex justify="space-between">
          <Button
            type="link"
            onClick={() =>
              router.push(`/master-data/writer/detail/${record.id}`)
            }
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
        url: `/api/master-data/writer/delete/`,
        method: "DELETE",
        data: { id },
      })
      .then((response) => {
        if (response.status === 200) {
          messageApi.success("Author deleted successfully");
          router.reload();
        }
      })
      .catch((error) => {
        messageApi.error("Failed to delete author");
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
              onClick={() => router.push("/master-data/writer/add")}
            >
              Add Writer
            </Button>
          </Flex>
        </Col>
        <Col span={24}>
          <MainTable dataSource={author} columns={columns} />
        </Col>
      </Row>
    </>
  );
};

export default AuthorManagement;

export const getStaticProps = async () => {
  const author = await prisma.author.findMany({
    // where: {
    //   NOT: {
    //     username: "admin",
    //   },
    // },
  });
  // console.log(author);
  const formattedAuthors = author.map((user) => ({
    id: user.id,
    name: user.name,
  }));
  // console.log(formattedAuthors, "ini author");
  return {
    props: { author: formattedAuthors },
    revalidate: 10,
  };
};
