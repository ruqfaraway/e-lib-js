import MainDatePicker from "@/components/MainDatePicker/MainDatePicker";
import { Button, Flex, Form, Input, message, Typography } from "antd";
import axios from "axios";
import { useRouter } from "next/router";

const CreateWriter = () => {
  const router = useRouter();
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const handleOnFinish = async (values) => {
    return await axios
      .request({
        method: "POST",
        url: "/api/master-data/writer/add",
        data: values,
      })
      .then((response) => {
        if (response.status === 201) {
          messageApi.success("Writer created successfully");
          router.push("/master-data/writer");
        }
      })
      .catch((error) => {
        messageApi.error("Failed to create writer");
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
          <Typography.Title level={4}>Form Tambah Penulis</Typography.Title>
        </Form.Item>
        <Form.Item
          label="Nama"
          name="name"
          rules={[{ required: true, message: "Please input your name!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Bio"
          name="bio"
          rules={[{ required: true, message: "Please input your bio!" }]}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item wrapperCol={{ span: 16 }}>
          <Flex justify="end" gap="middle">
            <Button onClick={() => router.push("/master-data/writer")}>
              Back
            </Button>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Flex>
        </Form.Item>
      </Form>
    </>
  );
};

export default CreateWriter;
