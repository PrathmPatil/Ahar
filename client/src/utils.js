import { PoweroffOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Button } from "antd";

export const Chip = ({ item, index }) => {
  return (
    <p
      style={{
        padding: "3px",
        border: "1px solid black",
        borderRadius: "5px",
        background: "#F6F5F2",
      }}
      key={index}
    >
      {item}
    </p>
  );
};

export const LogOut = ({ logOut, isLoader, userName, role }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        flexDirection: "column",
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <Avatar size={30} icon={<UserOutlined style={{ margin: "10px" }} />} />
        <h6>{userName}</h6>
      </div>

      <p>{role}</p>
      <Button
        type="primary"
        icon={<PoweroffOutlined />}
        loading={isLoader}
        onClick={() => logOut()}
      >
        LogOut
      </Button>
    </div>
  );
};
