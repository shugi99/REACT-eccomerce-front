import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu, Breadcrumb } from 'antd';
import { LaptopOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;
const { Sider } = Layout;

function AdminNav() {
  return (
    <Sider width={200}>
      <Menu
        mode='inline'
        defaultOpenKeys={['sub1', 'sub2', 'sub3']}
        style={{ height: '100%', borderRight: 0 }}
      >
        <SubMenu key='sub2' icon={<LaptopOutlined />} title='Admin Navbar'>
          <Menu.Item key='1'>
            <Link to='/admin/dashboard'>Admin Dashboard</Link>
          </Menu.Item>
        </SubMenu>

        <SubMenu key='sub2' icon={<LaptopOutlined />} title='Products'>
          <Menu.Item key='2'>
            <Link to='/admin/product'>Create Product</Link>
          </Menu.Item>
          <Menu.Item key='3'>
            <Link to='/admin/products'>All Products</Link>
          </Menu.Item>
        </SubMenu>
        <Menu.Item key='4'>
          <Link to='/admin/category'>Category</Link>
        </Menu.Item>
        <Menu.Item key='5'>
          <Link to='/admin/sub'>Sub Category</Link>
        </Menu.Item>
        <Menu.Item key='6'>
          <Link to='/admin/coupon'>Coupons Page</Link>
        </Menu.Item>
        <Menu.Item key='7'>
          <Link to='/user/profile'>User Dashboard</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
}

export default AdminNav;
