import MainTable from "@/components/MainTable/MainTable";
import { Button, Col, Flex, Row } from "antd";
import dayjs from "dayjs";
import { useRouter } from "next/router";

const LoansManagement = ({ dataSource }) => {
  const router = useRouter();
  const columns = [
    {
      title: "No",
      dataIndex: "key",
      key: "key",
      render: (_, record, index) => index + 1,
    },
    {
      title: "Peminjam",
      dataIndex: "user",
      key: "user",
    },
    {
      title: "Judul",
      dataIndex: "book",
      key: "book",
    },
    {
      title: "Tanggal Pinjam",
      dataIndex: "borrowDate",
      key: "borrowDate",
    },
    {
      title: "Tanggal Jatuh Tempo",
      dataIndex: "dueDate",
      key: "dueDate",
    },
    {
      title: "Tanggal Kembali",
      dataIndex: "returnDate",
      key: "returnDate",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Aksi",
      key: "action",
      render: (_, record) => (
        <Flex justify="space-between">
          <Button
            type="link"
            onClick={() => router.push(`/loans-management/detail/${record.id}`)}
          >
            Edit
          </Button>
          {/* <Button type="link" danger onClick={() => handleDelete(record.id)}>
          Delete
        </Button> */}
        </Flex>
      ),
    },
  ];
  return (
    <>
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
              onClick={() => router.push("/loans-management/add")}
            >
              Tambah Peminjaman
            </Button>
          </Flex>
        </Col>
        <Col span={24}>
          <MainTable dataSource={dataSource} columns={columns} rowKey="id" />
        </Col>
      </Row>
    </>
  );
};

export default LoansManagement;

export const getStaticProps = async () => {
  const datas = await prisma.borrowing.findMany({
    include: {
      book: true,
      user: true,
    },
  });
  const borrowsData = datas.map((data) => ({
    id: data.id,
    user: data.user.name,
    book: data.book.title,
    borrowDate: dayjs(data.borrowDate).format("YYYY-MM-DD"),
    dueDate: dayjs(data.dueDate).format("YYYY-MM-DD"),
    returnDate: data.returnDate
      ? dayjs(data.returnDate).format("YYYY-MM-DD")
      : null,
    status: data.status,
  }));
  return {
    props: { dataSource: borrowsData },
    revalidate: 10,
  };
};
