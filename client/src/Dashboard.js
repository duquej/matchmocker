import React, { useContext, useState } from "react";
import UserProvider from "./contexts/UserProvider";
import _ from "lodash";
import InterviewForm from "./components/InterviewForm";

import "antd/dist/antd.css";
import "./Dashboard.css";

import { Layout, Menu, Breadcrumb } from "antd";
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
} from "@ant-design/icons";

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

const LoginMsg =
  "Uh oh, there's nothing to show! " +
  "Login to see how much of your invaluable personal " +
  "data tech companies have at their disposal.";

const Profile = () => {
  const [selected, setSelected] = useState("All");
  const userData = useContext(UserProvider.context);
  const text = userData.username;

  return (
    <Layout>
      <Header style={{ color: "#FFF", fontSize: "16px" }}>
        MatchMocker
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["1"]}
          style={{ float: "right" }}
        >
          <Menu.Item key="1">dashboard</Menu.Item>
          <Menu.Item key="2">interview listings</Menu.Item>
          <Menu.Item key="3">make post</Menu.Item>
          <Menu.Item key="4">contact us</Menu.Item>
        </Menu>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            style={{ height: "100%", borderRight: 0 }}
          >
            <SubMenu
              key="sub1"
              icon={<UserOutlined />}
              title={userData.username}
            >
              <Menu.Item key="1">Logout</Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout style={{ padding: "0 24px 24px" }}>
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            <InterviewForm></InterviewForm>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default Profile;
