import prisma from "@/lib/prisma";
import { Button, Col, Flex, message, Row, Table, Typography } from "antd";
import axios from "axios";
import { useRouter } from "next/router";
import React from "react";
import MainTable from "@/components/MainTable/MainTable";

const OfficersManagement = ({ users }) => {
  // console.log(users, "uss");
  const router = useRouter();
  const [messageApi, contextHolder] = message.useMessage();
  const columns = [
    {
      title: "Nama",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Alamat",
      dataIndex: "address",
      key: "address",
      render: (text) => (
        <Typography.Text>
          {text.length > 25 ? text.slice(0, 25) + "..." : text}
        </Typography.Text>
      ),
    },
    {
      title: "Action",
      dataIndex: "Action",
      key: "action",
      render: (text, record) => (
        <Flex justify="space-between">
          <Button
            type="link"
            onClick={() => router.push(`/users-management/detail/${record.id}`)}
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
        url: `/api/user/delete/`,
        method: "DELETE",
        data: { id },
      })
      .then((response) => {
        if (response.status === 200) {
          messageApi.success("User deleted successfully");
          router.reload();
        }
      })
      .catch((error) => {
        messageApi.error("Failed to delete user");
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
              onClick={() => router.push("/users-management/add")}
            >
              Tambah Anggota
            </Button>
          </Flex>
        </Col>
        <Col span={24}>
          <MainTable rowKey="id" dataSource={users} columns={columns} />
        </Col>
      </Row>
    </>
  );
};

export default OfficersManagement;

export const getStaticProps = async () => {
  const users = await prisma.user.findMany({
    where: {
      NOT: {
        username: "admin",
      },
    },
  });
  // console.log(users);
  const formattedUsers = users.map((user) => ({
    id: user.id,
    name: user.name,
    address: user.address,
    phoneNumber: user.phoneNumber,
    email: user.email,
  }));
  // console.log(formattedUsers, "ini users");
  return {
    props: { users: formattedUsers },
    revalidate: 10,
  };
};
