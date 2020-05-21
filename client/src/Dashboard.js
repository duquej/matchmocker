import React, { useContext, useState } from "react";
import UserProvider from "./contexts/UserProvider";
import _ from "lodash";
import InterviewForm from "./components/InterviewForm";
import { Route, Switch, useRouteMatch, Link, Router } from "react-router-dom";

import "antd/dist/antd.css";
import "./Dashboard.css";

import { Layout, Menu } from "antd";
import { UserOutlined } from "@ant-design/icons";
import MyInterviews from "./components/MyInterviews";
import DisplayRequest from "./components/DisplayRequest";
import InterviewListings from "./components/InterviewListings";

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
          defaultSelectedKeys={["dashboard"]}
          style={{ float: "right" }}
        >
          <Menu.Item key="dashboard">
            <Link to={`/dashboard`} className="nav-text">
              dashboard
            </Link>
          </Menu.Item>
          <Menu.Item key="listings">
            <Link to={`/dashboard/listings`} className="nav-text">
              interview listings
            </Link>
          </Menu.Item>
          <Menu.Item key="request">
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
