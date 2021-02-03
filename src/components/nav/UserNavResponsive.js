import { Button, Col, Drawer } from 'antd';
import React from 'react';
import UserNav from './UserNav';

const UserNavResponsive = ({ onClose, showDrawer, visible }) => {
  return (
    <>
      <Col span={6} xs={{ span: 0 }} sm={{ span: 0 }} md={{ span: 6 }}>
        <UserNav />
      </Col>
      <div className='mobileVisible'>
        <Button type='secondary' onClick={showDrawer}>
          <i className='fas fa-bars'>User Navbar</i>
        </Button>
        <Drawer
          placement='left'
          closable={false}
          onClose={onClose}
          visible={visible}
        >
          <UserNav />
        </Drawer>
      </div>
    </>
  );
};

export default UserNavResponsive;
