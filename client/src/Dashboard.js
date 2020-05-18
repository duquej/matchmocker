import React, { useContext, useState } from "react";
import UserProvider from "./contexts/UserProvider";
import _ from "lodash";
import InterviewForm from "./components/InterviewForm";
import { Route, Switch, useRouteMatch, Link, Router } from "react-router-dom";

import "antd/dist/antd.css";
import "./Dashboard.css";

import { Layout, Menu, Breadcrumb } from "antd";
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
} from "@ant-design/icons";
import MyInterviews from "./components/MyInterviews";

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
  let match = useRouteMatch();

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
          <Menu.Item key="1">
            <Link to={`/dashboard`} className="nav-text">
              dashboard
            </Link>
          </Menu.Item>
          <Menu.Item key="2">interview listings</Menu.Item>
          <Menu.Item key="3">
            <Link to={`/dashboard/request`} className="nav-text">
              request an interview
            </Link>
          </Menu.Item>
          <Menu.Item key="4">contact us</Menu.Item>
          <Menu.Item key="5">submit issue</Menu.Item>
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
              <Menu.Item key="2">
                <Link to={`/logout`} className="nav-text">
                  logout
                </Link>
              </Menu.Item>
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
            <Switch>
              <Route
                path={`/dashboard/request`}
                render={() => (
                  <InterviewForm
                    email={userData.email}
                    googleID={userData.googleID}
                  ></InterviewForm>
                )}
              />

              <Route
                path={`${match.path}`}
                render={() => (
                  <MyInterviews
                    googleID={userData.googleID}
                    email={userData.email}
                    username={userData.username}
                    userImage={userData.profilePic}
                    test={true}
                  ></MyInterviews>
                )}
              />
            </Switch>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default Profile;
