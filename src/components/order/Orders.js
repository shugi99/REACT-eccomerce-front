import React from 'react';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import ShowPaymentInfo from '../cards/ShowPaymentInfo';
import { Col, Row, Select } from 'antd';
const { Option } = Select;

const Orders = ({ orders, handleStatusChange }) => {
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

  return (
    <>
      {orders.length > 0
        ? orders.map((order) => (
            <Row
              key={order._id}
              style={{
                backgroundColor: '#fafafa',
                paddingBottom: '16px',
              }}
            >
              <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }}>
                <Col span={24} style={{ backgroundColor: 'lightGray' }}>
                  {' '}
                  <ShowPaymentInfo order={order} showStatus={false} />
                </Col>

                <Row style={{ paddingTop: '8px', paddingBottom: '8px' }}>
                  <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }}>
                    <strong>Delivery Status</strong>
                  </Col>
                  <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 16 }}>
                    <Select
                      defaultValue={order.orderStatus}
                      onChange={(e) => handleStatusChange(order._id, e)}
                    >
                      <Option value='Not Processed'>Not Processed</Option>
                      <Option value='Cash On Delivery'>Cash On Delivery</Option>
                      <Option value='Processing'>Processing</Option>
                      <Option value='Dispatched'>Dispatched</Option>
                      <Option value='Cancelled'>Cancelled</Option>
                      <Option value='Completed'>Completed</Option>
                    </Select>
                  </Col>
                </Row>

                {showOrderInTable(order)}
              </Col>
            </Row>
          ))
        : 'No existing Orders'}
    </>
  );
};

export default Orders;
