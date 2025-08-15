import MainDatePicker from "@/components/MainDatePicker/MainDatePicker";
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
import dayjs from "dayjs";
import { useRouter } from "next/router";

const LoanManagamentAdd = ({ users, books }) => {
  const router = useRouter();
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const handleOnFinish = async (values) => {
    const toBeSubmitted = {
      ...values,
      borrowDate: dayjs(values.borrowDate).toDate(),
      dueDate: dayjs(values.dueDate).toDate(),
      returnDate: dayjs(values.returnDate).toDate(),
    };
    return await axios
      .request({
        method: "POST",
        url: "/api/loans/add",
        data: {
          ...toBeSubmitted,
        },
      })
      .then((response) => {
        if (response.status === 201) {
          messageApi.success("Peminjaman Berhasil Diproses");
          router.push("/loans-management");
        }
      })
      .catch((error) => {
        messageApi.error("Failed to create Peminjaman");
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
          <Typography.Title level={4}>Form Tambah Peminjaman</Typography.Title>
        </Form.Item>
        <Form.Item
          label="User"
          name="userId"
          rules={[{ required: true, message: "User harus dipilih" }]}
        >
          <Select
            placeholder="Pilih User"
            options={users}
            showSearch
            optionFilterProp="label"
          />
        </Form.Item>

        {/* Book */}
        <Form.Item
          label="Book"
          name="bookId"
          rules={[{ required: true, message: "Buku harus dipilih" }]}
        >
          <Select
            placeholder="Pilih Buku"
            options={books}
            showSearch
            optionFilterProp="label"
          />
        </Form.Item>

        {/* Borrow Date */}
        <Form.Item
          label="Tanggal Pinjam"
          name="borrowDate"
          rules={[{ required: true, message: "Tanggal pinjam harus diisi" }]}
        >
          <MainDatePicker valueFormat="YYYY-MM-DD" parseFormat="YYYY-MM-DD" />
        </Form.Item>

        {/* Due Date */}
        <Form.Item
          label="Tanggal Jatuh Tempo"
          name="dueDate"
          rules={[
            { required: true, message: "Tanggal jatuh tempo harus diisi" },
          ]}
        >
          <MainDatePicker valueFormat="YYYY-MM-DD" parseFormat="YYYY-MM-DD" />
        </Form.Item>

        {/* Return Date */}
        <Form.Item label="Tanggal Pengembalian" name="returnDate">
          <MainDatePicker valueFormat="YYYY-MM-DD" parseFormat="YYYY-MM-DD" />
        </Form.Item>

        {/* Status */}
        <Form.Item
          label="Status"
          name="status"
          rules={[{ required: true, message: "Status harus dipilih" }]}
        >
          <Select
            options={[
              { value: "DIPINJAM", label: "Dipinjam" },
              { value: "DIKEMBALIKAN", label: "Dikembalikan" },
              { value: "TERLAMBAT", label: "Terlambat" },
            ]}
          />
        </Form.Item>

        {/* Fine */}
        <Form.Item label="Denda" name="fine">
          <InputNumber
            style={{ width: "100%" }}
            min={0}
            step={1000}
            placeholder="Masukkan denda"
          />
        </Form.Item>

        {/* Notes */}
        <Form.Item label="Catatan" name="notes">
          <Input.TextArea rows={3} placeholder="Catatan tambahan" />
        </Form.Item>
        <Form.Item wrapperCol={{ span: 16 }}>
          <Flex justify="end" gap="middle">
            <Button onClick={() => router.push("/loans-management")}>
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

export default LoanManagamentAdd;

export const getServerSideProps = async () => {
  const user = await prisma.user.findMany({
    where: {
      NOT: {
        username: "admin",
      },
    },
  });
  const books = await prisma.book.findMany({});
  const DROPDOWN_BOOK = books.map((book) => ({
    value: book.id,
    label: book.title,
  }));
  const DROPDOWN_USER = user.map((user) => ({
    value: user.id,
    label: user.name,
  }));
  return {
    props: { users: DROPDOWN_USER, books: DROPDOWN_BOOK },
  };
};
