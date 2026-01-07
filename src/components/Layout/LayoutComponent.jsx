import {
  BookOutlined,
  DashboardOutlined,
  SwapOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Layout, Menu, theme, Typography } from "antd";
import { useRouter } from "next/router";
import { useState } from "react";
const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem("Dashboard", "/", <DashboardOutlined />),
  getItem("Manajemen User", "/users-management", <UserOutlined />),
  getItem("Manajemen Buku", "sub1", <BookOutlined />, [
    getItem("Daftar Buku", "/books-management"),
    getItem("Penerbit", "/master-data/publisher"),
    getItem("Penulis", "/master-data/writer"),
  ]),
  getItem("Kelola Pinjaman", "/loans-management", <SwapOutlined />),
];
const LayoutComps = ({ children }) => {
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout style={{ minHeight: "100vh", margin: 0, padding: 0 }}>
      <Sider
        width={250}
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <Typography.Text
          style={{
            padding: "16px",
            color: "white",
            display: "block",
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          SIPUT
        </Typography.Text>
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
          onClick={({ key }) => {
            router.push(key);
          }}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 15, background: colorBgContainer }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Typography.Text
              style={{ fontSize: 24, color: "black", fontWeight: "bold" }}
            >
              SDN 4 TLAHAB LOR
            </Typography.Text>
            <Avatar size={32} icon={<UserOutlined />} />
          </div>
        </Header>
        <Content style={{ padding: "24px 16px 0" }}>
          <div
            style={{
              padding: 24,
              minHeight: "80vh",
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {children}
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          {/* Ruq Faraway ©{new Date().getFullYear()} Created by Ruq Faraway */}
          -
        </Footer>
      </Layout>
    </Layout>
  );
};
export default LayoutComps;
