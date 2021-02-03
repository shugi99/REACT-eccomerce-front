import React, { useState } from 'react';
import { Menu, Badge } from 'antd';
import {
  AppstoreOutlined,
  SettingOutlined,
  UserOutlined,
  UserAddOutlined,
  LogoutOutlined,
  ShoppingOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Search from '../forms/Search';
import { logout } from '../../functions/auth';

const { SubMenu, Item } = Menu;

const Header = () => {
  const [current, setCurrent] = useState('home');

  let dispatch = useDispatch();
  let { cart } = useSelector((state) => ({ ...state }));
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  let history = useHistory();

  const handleClick = (e) => {
    // console.log(e.key);
    setCurrent(e.key);
  };

  const logoutHandler = () => {
    dispatch(logout());
    history.push('/login');
  };

  return (
    <Menu onClick={handleClick} selectedKeys={[current]} mode='horizontal'>
      <Item key='home' icon={<AppstoreOutlined />}>
        <Link to='/'>Home</Link>
      </Item>

      <Item key='shop' icon={<ShoppingOutlined />}>
        <Link to='/shop'>Shop</Link>
      </Item>

      <Item key='cart' icon={<ShoppingCartOutlined />}>
        <Link to='/cart'>
          <Badge count={cart.length} offset={[9, 0]}>
            Cart
          </Badge>
        </Link>
      </Item>

      {!userInfo && (
        <Item key='register' icon={<UserAddOutlined />} className='float-right'>
          <Link to='/register'>Register</Link>
        </Item>
      )}

      {!userInfo && (
        <Item key='login' icon={<UserOutlined />} className='float-right'>
          <Link to='/login'>Login</Link>
        </Item>
      )}

      {userInfo && (
        <SubMenu
          icon={<SettingOutlined />}
          title={userInfo.name}
          className='float-right'
        >
          {userInfo && userInfo.role === 'subscriber' && (
            <Item>
              <Link to='/user/history'>Dashboard</Link>
            </Item>
          )}

          {userInfo && userInfo.role === 'admin' && (
            <Item>
              <Link to='/admin/dashboard'>Dashboard</Link>
            </Item>
          )}

          <Item icon={<LogoutOutlined />} onClick={logoutHandler}>
            Logout
          </Item>
        </SubMenu>
      )}

      <div className='mobileHiddenSearchInput'>
        <Search />
      </div>
    </Menu>
  );
};

export default Header;
