import { Button, Flex, Form, Input, message, Typography } from "antd";
import axios from "axios";
import { useRouter } from "next/router";

const DetailPublisher = ({ publisher, id }) => {
  // console.log(user, "user");
  const router = useRouter();
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const handleOnFinish = async (values) => {
    return await axios
      .request({
        method: "POST",
        url: `/api/master-data/publisher/update/${id}`,
        data: values,
      })
      .then((response) => {
        if (response.status === 200) {
          messageApi.success("publisher updated successfully");
          router.push("/master-data/publisher");
        }
      })
      .catch((error) => {
        messageApi.error("Failed to update publisher");
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
        initialValues={publisher}
      >
        <Form.Item>
          <Typography.Title level={4}>Form Edit Penerbit</Typography.Title>
        </Form.Item>
        <Form.Item
          label="Nama"
          name="name"
          rules={[{ required: true, message: "Please input your name!" }]}
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
          label="Kontak"
          name="contact"
          rules={[{ required: true, message: "Please input your contact!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item wrapperCol={{ span: 16 }}>
          <Flex justify="end" gap="middle">
            <Button onClick={() => router.push("/master-data/publisher")}>
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

export default DetailPublisher;
export const getServerSideProps = async ({ params }) => {
  console.log(params?.id, "req");
  const publisher = await prisma.publisher.findFirst({
    where: {
      id: Number(params?.id),
    },
  });
  console.log(publisher);
  const formattedPublisher = {
    id: publisher.id,
    name: publisher.name,
    address: publisher.address,
    contact: publisher.contact,
  };
  // console.log(formattedUsers, "ini users");
  return {
    props: { publisher: formattedPublisher, id: params?.id },
    // revalidate: 10,
  };
};
