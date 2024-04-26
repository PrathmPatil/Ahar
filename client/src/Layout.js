import React, { Children, useState } from "react";
import {
  ControlOutlined,
  FireOutlined,
  HistoryOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SearchOutlined,
  TruckOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, Space, Avatar, Popover, Input } from "antd";
import { LogOut } from "./utils";
import "./layout.scss";
import { useNavigate } from "react-router-dom";
import SearchBar from "./Components/searchBar";

const { Header, Sider, Content } = Layout;

const CustomLayout = ({ children, setSelectedKey, selectedKey,isSearch=false }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [logIn, setShowLogIn] = useState(false);
  const [showSearchBar,setShowSearchBar]=useState(false)
  const navigate = useNavigate();
  const routes = {
    1: "/foodList",
    2: "/Admin",
    3: "/history",
    4:"/addBranch"
  };
  const handleMenuClick = (e) => {
    const key = e.key;
    const route = routes[key];
    setSelectedKey(key);
    navigate(route);
  };

  const logOut = () => {
    console.log("logOut");
  };
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
        {!collapsed ? (
          <div className="logo">AHAR</div>
        ) : (
          <div className="logo1">
            <FireOutlined />
          </div>
        )}

        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[selectedKey]}
          onClick={handleMenuClick}
        >
          <Menu.Item key="1" icon={<ControlOutlined />}>
            Today's Food
          </Menu.Item>
          <Menu.Item key="2" icon={<TruckOutlined />}>
            Order Status
          </Menu.Item>
          <Menu.Item key="3" icon={<HistoryOutlined />}>
            History
          </Menu.Item>
          <Menu.Item key="4" icon={<HistoryOutlined />}>
            Branchs
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
              color: "white",
            }}
          />
                      {/* {showSearchBar && <SearchBar setShowSearchBar={setShowSearchBar} showSearchBar={showSearchBar}/>} */}

          <div style={{ marginRight: "30px",marginBottom:"-10px",padding:"0px 7px",backgroundColor:"grey" }}>
          {/* {true && (
              <SearchOutlined className="searchIcon" size={20} onClick={()=>setShowSearchBar(!showSearchBar) }/>
            )} */}
            <Space direction="vertical" size={16} style={{cursor:"pointer"}}>
                <Avatar
                  size={30}
                  icon={
                    <UserOutlined onMouseEnter={() => setShowLogIn(true)}/>
                  }
                />
                <Popover
                  style={{
                    width: 500,
                  }}
                  content={
                    <div>
                      <LogOut
                        logOut={logOut}
                        isLoader={false}
                        userName={"Prathmesh Patil"}
                        role={"Admin"}
                      />
                    </div>
                  }
                  title="Login"
                  trigger="hover"
                  open={logIn}
                  onOpenChange={() => setShowLogIn(false)}
                  onMouseLeave={()=>setShowLogIn(false)}
                />
              </Space>
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            minHeight: 280,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default CustomLayout;
