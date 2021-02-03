import React, { useState, useEffect } from 'react';
import AdminNav from '../../components/nav/AdminNav';
import { getOrders, changeStatus } from '../../functions/admin';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Orders from '../../components/order/Orders';
import { Button, Col, Drawer, Row } from 'antd';
import AdminNavResponsive from '../../components/nav/AdminNavResponsive';
import Loader from '../../components/loader/Loader';

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [callback, setCallback] = useState(false);
  const [loading, setLoading] = useState(false);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  useEffect(() => {
    const loadOrders = () => setLoading(true);
    getOrders(userInfo.token).then((res) => {
      setOrders(res.data);
      setLoading(false);
    });
    loadOrders();
  }, [callback, userInfo.token]);

  const handleStatusChange = (orderId, orderStatus) => {
    changeStatus(orderId, orderStatus, userInfo.token).then((res) => {
      toast.success('Status updated');
      setCallback(!callback);
    });
  };

  return (
    <div className='container-fluid2'>
      <Row gutter={[16, 0]}>
        <AdminNavResponsive
          visible={visible}
          onClose={onClose}
          showDrawer={showDrawer}
        />

        <Col span={18} xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 18 }}>
          <div className='block2'>
            <div className='titleHolder2'>
              <h2>Admin Dashboard</h2>
            </div>
          </div>
          {loading ? (
            <Loader />
          ) : (
            <Orders orders={orders} handleStatusChange={handleStatusChange} />
          )}
        </Col>
      </Row>
    </div>
  );
};

export default AdminDashboard;
