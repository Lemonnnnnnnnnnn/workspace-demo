import { Link, Outlet } from "umi";
// import { LaptopOutlined, UserOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Layout, Menu, theme } from "antd";
import React from "react";
import { history } from 'umi';
import route from "../../config/route";

const { Header, Content, Footer, Sider } = Layout;

const menu = route.find(item => item.path === '/')?.routes || []

const items: MenuProps["items"] = menu.map(
  (item, index) => {
    const key = String(index + 1);

    return {
      key: `sub${key}`,
      label: item.name,
      onClick: () => {
        history.push(item.path)
      }
    };
  }
);

export default function GlobalLayout() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout>
      <Header style={{ display: "flex", alignItems: "center" }}>
        <text style={{color : '#fff'}}>header</text>
      </Header>
      <Content style={{ padding: "0 50px" }}>
        <Layout style={{ padding: "24px 0", background: colorBgContainer }}>
          <Sider style={{ background: colorBgContainer }} width={200}>
            <Menu
              mode="inline"
              defaultSelectedKeys={["sub1"]}
              defaultOpenKeys={["sub1"]}
              style={{ height: "100%" }}
              items={items}
            />
          </Sider>
          <Outlet />
        </Layout>
      </Content>
    </Layout>
  );
}
