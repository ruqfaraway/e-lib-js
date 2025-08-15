import React from "react";
import { Button, Card, Flex, Typography } from "antd";
import prisma from "@/lib/prisma";

const Home = ({ totalAnggota, totalBuku, totalDipinjam }) => (
  <>
    <Flex gap="middle" justify="space-between" style={{ width: "100%" }}>
      <Card title="Total Buku" style={{ width: "100%" }}>
        <Flex justify="end">
          <Typography.Text
            style={{
              fontSize: "2rem",
              fontWeight: "bold",
            }}
          >
            {totalBuku}
          </Typography.Text>
        </Flex>
      </Card>
      <Card title="Total Anggota" style={{ width: "100%" }}>
        <Flex justify="end">
          <Typography.Text
            style={{
              fontSize: "2rem",
              fontWeight: "bold",
            }}
          >
            {totalAnggota}
          </Typography.Text>
        </Flex>
      </Card>
      <Card title="Buku Yang Dipinjam" style={{ width: "100%" }}>
        <Flex justify="end">
          <Typography.Text
            style={{
              fontSize: "2rem",
              fontWeight: "bold",
            }}
          >
            {totalDipinjam}
          </Typography.Text>
        </Flex>
      </Card>
    </Flex>
  </>
);

export default Home;

export const getServerSideProps = async () => {
  // 1. Hitung total anggota selain admin
  const totalAnggota = await prisma.user.count({
    where: {
      NOT: { username: "admin" },
    },
  });

  // 2. Hitung total buku
  const totalBuku = await prisma.book.count();

  // 3. Hitung total buku yang sedang dipinjam (belum dikembalikan)
  const totalDipinjam = await prisma.borrowing.count({
    where: {
      returnDate: null, // atau status: 'DIPINJAM' kalau pakai status
    },
  });

  return {
    props: {
      totalAnggota,
      totalBuku,
      totalDipinjam,
    },
  };
};
