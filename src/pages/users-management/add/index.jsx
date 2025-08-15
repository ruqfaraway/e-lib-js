import MainDatePicker from "@/components/MainDatePicker/MainDatePicker";
import { Button, Flex, Form, Input, message, Typography } from "antd";
import axios from "axios";
import { useRouter } from "next/router";

const CreateUser = () => {
  const router = useRouter();
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const handleOnFinish = async (values) => {
    return await axios
      .request({
        method: "POST",
        url: "/api/user/add",
        data: values,
      })
      .then((response) => {
        if (response.status === 201) {
          messageApi.success("User created successfully");
          router.push("/users-management");
        }
      })
      .catch((error) => {
        messageApi.error("Failed to create user");
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
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Alamat"
          name="address"
          rules={[{ required: true, message: "Please input your address!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="No Telepon"
          name="phone"
          rules={[
            { required: true, message: "Please input your phone number!" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="NIK"
          name="nationalId"
          rules={[{ required: true, message: "Please input your NIK!" }]}
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
          ]}
        >
          <Input />
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

export default CreateUser;
