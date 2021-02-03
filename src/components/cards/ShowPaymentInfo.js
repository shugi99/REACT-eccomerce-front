import React from 'react';
import { Typography } from 'antd';

const { Paragraph } = Typography;

const ShowPaymentInfo = ({ order, showStatus = true }) => (
  <div>
    <span>
      <strong>Order Id:</strong> {order.paymentIntent.id}
    </span>
    <br />
    <span>
      <strong>Amount:</strong>
      {(order.paymentIntent.amount /= 100).toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
      })}
    </span>
    {'   '}
    <span>
      <strong>Currency:</strong> {order.paymentIntent.currency.toUpperCase()}
    </span>
    {'   '}
    <span>
      <strong>Method:</strong>
      {order.paymentIntent.payment_method_types[0]}
    </span>
    {'   '}
    <span>
      <strong>Payment:</strong>
      {'   '} {order.paymentIntent.status.toUpperCase()}
    </span>
    {'   '}
    <span>
      <strong>Order Date:</strong>
      {'   '}
      {new Date(order.paymentIntent.created * 1000).toLocaleString()}
    </span>
    {'   '}
    <br />
    {showStatus && (
      <span className='badge bg-primary text-white'>
        STATUS: {order.orderStatus}
      </span>
    )}
  </div>
);

export default ShowPaymentInfo;
