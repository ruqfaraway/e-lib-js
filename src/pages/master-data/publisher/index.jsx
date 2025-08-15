import MainTable from "@/components/MainTable/MainTable";
import { Button, Col, Flex, message, Row, Table } from "antd";
import { useRouter } from "next/router";
import React from "react";
const dataSource = [
  {
    key: "1",
    name: "Fiction",
  },
  {
    key: "2",
    name: "Non-Fiction",
  },
];

const columns = [
  {
    title: "No",
    dataIndex: "key",
    key: "key",
  },
  {
    title: "Category",
    dataIndex: "name",
    key: "name",
  },
];

const PublisherManagement = ({ publisher }) => {
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
      title: "Penerbit",
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
              router.push(`/master-data/publisher/detail/${record.id}`)
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
        url: `/api/master-data/publisher/delete/`,
        method: "DELETE",
        data: { id },
      })
      .then((response) => {
        if (response.status === 200) {
          messageApi.success("Publisher deleted successfully");
          router.reload();
        }
      })
      .catch((error) => {
        messageApi.error("Failed to delete Publisher");
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
              onClick={() => router.push("/master-data/publisher/add")}
            >
              Tambah Penerbit
            </Button>
          </Flex>
        </Col>
        <Col span={24}>
          <MainTable dataSource={publisher} columns={columns} />
        </Col>
      </Row>
    </>
  );
};

export default PublisherManagement;

export const getStaticProps = async () => {
  const publisher = await prisma.publisher.findMany({
    // where: {
    //   NOT: {
    //     username: "admin",
    //   },
    // },
  });
  // console.log(publisher);
  const formattedPublishers = publisher.map((user) => ({
    id: user.id,
    name: user.name,
  }));
  // console.log(formattedPublishers, "ini publisher");
  return {
    props: { publisher: formattedPublishers },
    revalidate: 10,
  };
};
