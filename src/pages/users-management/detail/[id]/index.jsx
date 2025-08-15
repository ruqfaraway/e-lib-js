import MainDatePicker from "@/components/MainDatePicker/MainDatePicker";
import { Button, Flex, Form, Input, message, Typography } from "antd";
import axios from "axios";
import dayjs from "dayjs";
import { useRouter } from "next/router";

const DetailUser = ({ user, id }) => {
  // console.log(user, "user");
  const router = useRouter();
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const handleOnFinish = async (values) => {
    return await axios
      .request({
        method: "POST",
        url: `/api/user/update/${id}`,
        data: values,
      })
      .then((response) => {
        if (response.status === 200) {
          messageApi.success("User updated successfully");
          router.push("/users-management");
        }
      })
      .catch((error) => {
        messageApi.error("Failed to update user");
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
        initialValues={user}
      >
        <Form.Item>
          <Typography.Title level={4}>Form Tambah Anggota</Typography.Title>
        </Form.Item>
        <Form.Item
          label="Nama"
          name="name"
          rules={[{ required: true, message: "Please input your name!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Username"
          name="username"
          rules={[
            { required: true, message: "Please input your username!" },
            {
              pattern: /^[a-zA-Z0-9_]{3,16}$/,
              message:
                "Username must be 3-16 characters long and can only contain letters, numbers, and underscores.",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Alamat"
          name="address"
          rules={[
            { required: true, message: "Please input your address!" },
            {
              max: 100,
              message: "Address must be at most 100 characters long.",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="No Telepon"
          name="phoneNumber"
          rules={[
            { required: true, message: "Please input your phone number!" },
            {
              pattern: /^[0-9]{10}$/,
              message: "Phone number must be 10 digits long.",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please input your email!" },
            {
              type: "email",
              message: "Please input a valid email!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="NIK"
          name="nationalId"
          rules={[
            { required: true, message: "Please input your NIK!" },
            {
              pattern: /^[0-9]{16}$/,
              message: "NIK must be 16 digits long.",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Tanggal Lahir"
          name="dateOfBirth"
          rules={[
            { required: true, message: "Please input your date of birth!" },
          ]}
        >
          <MainDatePicker valueFormat="YYYY-MM-DD" parseFormat="YYYY-MM-DD" />
        </Form.Item>
        <Form.Item
          label="Kontak Darurat"
          name="emergencyContact"
          rules={[
            { required: true, message: "Please input your emergency contact!" },
            {
              pattern: /^[0-9]{14}$/,
              message: "Emergency contact must be 14 digits long.",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item wrapperCol={{ span: 16 }}>
          <Flex justify="end" gap="middle">
            <Button onClick={() => router.push("/users-management")}>
              Back
            </Button>
            <Button type="primary" htmlType="submit">
              Update
            </Button>
          </Flex>
        </Form.Item>
      </Form>
    </>
  );
};

export default DetailUser;
export const getServerSideProps = async ({ params }) => {
  console.log(params?.id, "req");
  const user = await prisma.user.findFirst({
    where: {
      id: Number(params?.id),
    },
  });
  console.log(user);
  const formattedUser = {
    id: user.id,
    name: user.name,
    username: user.username,
    address: user.address,
    phoneNumber: user.phoneNumber,
    email: user.email,
    nationalId: user.nationalId,
    dateOfBirth: dayjs(user.dateOfBirth).format("YYYY-MM-DD"),
    emergencyContact: user.emergencyContact,
  };
  // console.log(formattedUsers, "ini users");
  return {
    props: { user: formattedUser, id: params?.id },
    // revalidate: 10,
  };
};
