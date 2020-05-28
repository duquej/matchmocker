import React, { useContext, useState } from "react";
import UserProvider from "./contexts/UserProvider";
import _ from "lodash";
import InterviewForm from "./components/InterviewForm";
import { Route, Switch, useRouteMatch, Link, Router } from "react-router-dom";

import "antd/dist/antd.css";
import "./Dashboard.css";

import { Layout, Menu, Avatar } from "antd";
import {
  UserOutlined,
  LogoutOutlined,
  SettingOutlined,
  ProfileOutlined,
} from "@ant-design/icons";
import MyInterviews from "./components/MyInterviews";
import DisplayRequest from "./components/DisplayRequest";
import InterviewListings from "./components/InterviewListings";
import FormSuccess from "./components/FormSuccess";
import MySettings from "./components/MySettings";
import Profile from "./components/Profile";

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

const Dashboard = () => {
  const [selected, setSelected] = useState("All");
  const userData = useContext(UserProvider.context);
  const text = userData.username;
  let match = useRouteMatch();
  let pathname = window.location.pathname;
  let pathnameSider = pathname === "/" ? "/dashboard" : pathname;
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header style={{ color: "#FFF", fontSize: "16px" }}>
        MatchMocker
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={[pathnameSider || "/dashboard"]}
          style={{ float: "right" }}
        >
          <Menu.Item key="/dashboard">
            <Link to={`/dashboard`} className="nav-text">
              dashboard
            </Link>
          </Menu.Item>
          <Menu.Item key="/dashboard/listings">
            <Link to={`/dashboard/listings`} className="nav-text">
              interview listings
            </Link>
          </Menu.Item>
          <Menu.Item key="/dashboard/request">
            <Link to={`/dashboard/request`} className="nav-text">
              request an interview
            </Link>
          </Menu.Item>
          <Menu.Item key="submit-issue">
            <a href={`http://github.com/duquej/matchmocker/issues`}>
              submit issue
            </a>
          </Menu.Item>
        </Menu>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            defaultSelectedKeys={[pathnameSider || "/dashboard"]}
            defaultOpenKeys={["sub1"]}
            //theme="dark"
            style={{ height: "100%", borderRight: 0 }}
          >
            <SubMenu
              key="sub1"
              icon={<UserOutlined />}
              title={userData.username}
            >
              <Menu.Item key={`/dashboard/profile`}>
                <ProfileOutlined />
                <a href={`/dashboard/profile?googleID=${userData.googleID}`}>
                  Profile
                </a>
              </Menu.Item>
              <Menu.Item key="/dashboard/mySettings">
                <SettingOutlined />
                <Link to={`/dashboard/mySettings`} className="nav-text">
                  Settings
                </Link>
              </Menu.Item>
              <Menu.Item key="4">
                <LogoutOutlined />
                <a href="/logout">Logout</a>
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
                path={`/dashboard/listings`}
                render={() => (
                  <InterviewListings
                    name={userData.username}
                    email={userData.email}
                    googleID={userData.googleID}
                  ></InterviewListings>
                )}
              ></Route>

              <Route
                path={`/dashboard/formsuccess`}
                render={() => <FormSuccess></FormSuccess>}
              ></Route>

              <Route
                path={`/dashboard/displayRequest`}
                render={() => (
                  <DisplayRequest
                    name={userData.username}
                    email={userData.email}
                    googleID={userData.googleID}
                  ></DisplayRequest>
                )}
              />

              <Route
                path={`/dashboard/mySettings`}
                render={() => (
                  <MySettings
                    email={userData.email}
                    name={userData.username}
                    googleID={userData.googleID}
                  ></MySettings>
                )}
              ></Route>

              <Route
                path={`/dashboard/profile`}
                render={() => (
                  <Profile
                    email={userData.email}
                    name={userData.username}
                    googleID={userData.googleID}
                    profilePic={userData.profilePic}
                  ></Profile>
                )}
              ></Route>

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

export default Dashboard;
