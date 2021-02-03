import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu, Breadcrumb } from 'antd';
import { LaptopOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;
const { Sider } = Layout;

const UserNav = () => (
  <>
    <Sider width={200}>
      <Menu
        mode='inline'
        defaultOpenKeys={['sub2']}
        style={{ height: '100%', borderRight: 0 }}
      >
        <SubMenu key='sub2' icon={<LaptopOutlined />} title='User Navbar'>
          <Menu.Item key='1'>
            <Link to='/user/history'>Order history</Link>
          </Menu.Item>
          <Menu.Item key='2'>
            <Link to='/user/wishlist'>Wishlist</Link>
          </Menu.Item>
          <Menu.Item key='3'>
            <Link to='/user/profile'>Account Settings</Link>
          </Menu.Item>
        </SubMenu>
      </Menu>
    </Sider>
  </>
);

export default UserNav;
