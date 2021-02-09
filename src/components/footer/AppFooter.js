import React from 'react';

import { BackTop, Tooltip } from 'antd';
import {
  ArrowUpOutlined,
  FacebookOutlined,
  GithubOutlined,
  LinkedinOutlined,
  MailOutlined,
  ToolOutlined,
  UserSwitchOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';

function AppFooter() {
  return (
    <div className='footer'>
      <div className='logo'>
        <i className='fas fa-bolt'></i>
        <a href='http://google.com'>MERN SHOP</a>
      </div>
      <ul className='socials'>
        <li>
          <a href='https://www.github.com/' target='_blank' rel='noreferrer'>
            <GithubOutlined />
          </a>
        </li>
        <li>
          <a
            href='https://www.linkedin.com/in/shugi-yen-lazala-5b681a179/'
            target='_blank'
            rel='noreferrer'
          >
            <LinkedinOutlined />
          </a>
        </li>
        <li>
          <Tooltip title='Portfolio site'>
            <a
              href='https://shugi-portfolio.vercel.app/'
              target='_blank'
              rel='noreferrer'
            >
              <UserSwitchOutlined />
            </a>
          </Tooltip>
        </li>
        <li>
          <Tooltip title='Contact Me'>
            <Link to='/contact'>
              <MailOutlined />
            </Link>
          </Tooltip>
        </li>
      </ul>
      <div className='copyright'>Copyright &copy; 2020 MERN SHOP</div>
      <BackTop>
        <div className='goTop'>
          <ArrowUpOutlined style={{ fontSize: '24px', color: 'white' }} />
        </div>
      </BackTop>
    </div>
  );
}

export default AppFooter;
