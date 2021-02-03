import React, { useState, useEffect } from 'react';
import UserNav from '../../components/nav/UserNav';
import { getUserOrders } from '../../functions/user';
import { useSelector } from 'react-redux';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';

import ShowPaymentInfo from '../../components/cards/ShowPaymentInfo';
import { PDFDownloadLink } from '@react-pdf/renderer';
import Invoice from '../../components/order/Invoice';
import { Button, Card, Col, Row } from 'antd';
import Loader from '../../components/loader/Loader';
import UserNavResponsive from '../../components/nav/UserNavResponsive';

const History = () => {
  const [orders, setOrders] = useState([]);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  useEffect(() => {
    const loadUserOrders = () => setLoading(true);
    getUserOrders(userInfo.token).then((res) => {
      setOrders(res.data);
      setLoading(false);
    });
    loadUserOrders();
  }, [userInfo.token]);

  const showOrderInTable = (order) => (
    <table className='table table-bordered'>
      <thead className='thead-light'>
        <tr>
          <th scope='col'>Title</th>
          <th scope='col'>Price</th>
          <th scope='col'>Brand</th>
          <th scope='col'>Color</th>
          <th scope='col'>Count</th>
          <th scope='col'>Shipping</th>
        </tr>
      </thead>

      <tbody>
        {order.products.map((p, i) => (
          <tr key={i}>
            <td>
              <b>{p.product.title}</b>
            </td>
            <td>{p.product.price}</td>
            <td>{p.product.brand}</td>
            <td>{p.color}</td>
            <td>{p.count}</td>
            <td>
              {p.product.shipping === 'Yes' ? (
                <CheckCircleOutlined style={{ color: 'green' }} />
              ) : (
                <CloseCircleOutlined style={{ color: 'red' }} />
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  const showDownloadLink = (order) => (
    <Button type='primary'>
      <PDFDownloadLink
        document={<Invoice order={order} />}
        fileName='invoice.pdf'
      >
        Download PDF
      </PDFDownloadLink>
    </Button>
  );

  const showEachOrders = () =>
    orders.reverse().map((order, i) => (
      <Card key={i} style={{ margin: '16px 0' }}>
        <ShowPaymentInfo order={order} />
        {showOrderInTable(order)}
        <Row>
          <Col>{showDownloadLink(order)}</Col>
        </Row>
      </Card>
    ));

  return (
    <div className='container-fluid2'>
      <Row gutter={[16, 0]}>
        <UserNavResponsive
          visible={visible}
          onClose={onClose}
          showDrawer={showDrawer}
        />
        <Col span={18} xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 18 }}>
          <div className='block2'>
            <div className='titleHolder2'>
              {loading ? (
                <Loader />
              ) : orders.length > 0 ? (
                <>
                  <h4>User purchase orders</h4>
                  {showEachOrders()}
                </>
              ) : (
                <h4>No purchase orders</h4>
              )}
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default History;
