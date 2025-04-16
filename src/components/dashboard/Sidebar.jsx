import React from "react";
import { Layout, Menu } from "antd";
import {
  DashboardOutlined,
  LogoutOutlined,
  AppstoreOutlined,
  EditOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";

const { Sider } = Layout;

const Sidebar = ({ collapsed }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      trigger={null}
      className="min-h-screen"
      breakpoint="md"
      collapsedWidth="80"
      width="200"
    >
      <div className="text-center text-white py-4 font-bold text-xl tracking-widest">
        {!collapsed ? "LUMINA" : "☕"}
      </div>

      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["1"]}
        style={{ height: "100%", borderRight: 0 }}
      >
        <Menu.Item key="1" icon={<DashboardOutlined />}>
          <Link to="/admin/dashboard">Dashboard</Link>
        </Menu.Item>

        <Menu.SubMenu key="2" icon={<AppstoreOutlined />} title="Products">
          <Menu.Item key="2-1" icon={<EyeOutlined />}>
            <Link to="/admin/dashboard/products">View Products</Link>
          </Menu.Item>
          <Menu.Item key="2-2" icon={<EditOutlined />}>
            <Link to="/admin/dashboard/products/create">Add Product</Link>
          </Menu.Item>
        </Menu.SubMenu>

        <Menu.Item
          key="3"
          icon={<LogoutOutlined />}
          onClick={handleLogout}
          className="mt-auto"
        >
          Logout
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default Sidebar;
