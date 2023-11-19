import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBloggerB } from 'react-icons/fa';

import {
  AiOutlineDesktop,
  AiFillFile,
  AiOutlinePieChart,
  AiOutlineTeam,
  AiOutlineUser,
  AiFillFolder,
  AiOutlineShoppingCart

} from 'react-icons/ai';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { Outlet } from 'react-router-dom';
import './index.css'
const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  link?: string,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label: link ? <Link to={link}>{label}</Link> : label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem('Cửa hàng truyện tranh', '1', '/admin/dashboard', <AiOutlinePieChart />,),
  getItem('Quản lý sách', '2', '/admin/products', <AiOutlineDesktop />),
  getItem('Quản lý danh mục', '3', '/admin/categorys', <AiFillFolder />),
  getItem('Quản lý đánh giá', '4', '/admin/orders', <AiOutlineShoppingCart/>),
  getItem('Quản lý bình luận', '6', '/admin/comment', <AiOutlineDesktop />),
  getItem('Người dùng', 'sub1', '#', <AiOutlineUser />, [
  getItem('Quản Lý Người Dùng', '5', '/admin/user',),
  ]),
  // getItem('Team', 'sub2','#', <AiOutlineTeam />, [getItem('Team 1', '7'), getItem('Team 2', '8')]),
  // getItem('Files', '9','#', <AiFillFile />),

];

const LayoutAdmin = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout className="min-h-screen  ">

      <Sider
        width={"208px"}
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        className="pt-14  "
      >
        <div className="demo-logo-vertical" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} className='w-52 ' />
      </Sider>
      <Layout>
        <Header className="flex items-center justify-between p-4 bg-gradient-to-t from-[#d0ccd0] to-[#605856] text-white rounded-b-lg h-24">
          <div className="flex items-center mx-auto">
            <AiOutlineDesktop className="text-3xl mr-4 mt-2" />
            <span className="text-3xl font-semibold ">Quản trị Website</span>
          </div>
          <Menu theme="dark" mode="horizontal" />
        </Header>
        <Content className="px-8 py-6 bg-gray-100">
          <div className="bg-gradient-to-r from-[#d0ccd0] to-[#605856] rounded-lg shadow-md p-8">

            <Outlet />
          </div>
        </Content>

      </Layout>
    </Layout>
  );
};

export default LayoutAdmin;
