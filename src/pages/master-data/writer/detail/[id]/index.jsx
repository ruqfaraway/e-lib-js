import MainDatePicker from "@/components/MainDatePicker/MainDatePicker";
import { Button, Flex, Form, Input, message, Typography } from "antd";
import axios from "axios";
import dayjs from "dayjs";
import { useRouter } from "next/router";

const DetailAuthor = ({ author, id }) => {
  // console.log(user, "user");
  const router = useRouter();
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const handleOnFinish = async (values) => {
    return await axios
      .request({
        method: "POST",
        url: `/api/master-data/writer/update/${id}`,
        data: values,
      })
      .then((response) => {
        if (response.status === 200) {
          messageApi.success("Author updated successfully");
          router.push("/master-data/writer");
        }
      })
      .catch((error) => {
        messageApi.error("Failed to update author");
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
        initialValues={author}
      >
        <Form.Item>
          <Typography.Title level={4}>Form Edit Anggota</Typography.Title>
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

export default DetailAuthor;
export const getServerSideProps = async ({ params }) => {
  console.log(params?.id, "req");
  const author = await prisma.author.findFirst({
    where: {
      id: Number(params?.id),
    },
  });
  console.log(author);
  const formattedAuthor = {
    id: author.id,
    name: author.name,
    bio: author.bio,
  };
  // console.log(formattedUsers, "ini users");
  return {
    props: { author: formattedAuthor, id: params?.id },
    // revalidate: 10,
  };
};
