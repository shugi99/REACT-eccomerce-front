import { Button, Col, Drawer } from 'antd';
import React from 'react';
import AdminNav from './AdminNav';

const AdminNavResponsive = ({ onClose, showDrawer, visible }) => {
  return (
    <>
      <Col span={6} xs={{ span: 0 }} sm={{ span: 0 }} md={{ span: 6 }}>
        <AdminNav />
      </Col>
      <div className='mobileVisible'>
        <Button type='secondary' onClick={showDrawer}>
          <i className='fas fa-bars'>Admin Navbar</i>
        </Button>
        <Drawer
          placement='left'
          closable={false}
          onClose={onClose}
          visible={visible}
        >
          <AdminNav />
        </Drawer>
      </div>
    </>
  );
};

export default AdminNavResponsive;
