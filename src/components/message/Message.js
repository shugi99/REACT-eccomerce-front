import React from 'react';
import { Alert, Col } from 'antd';

const Message = ({ variant, children }) => {
  return (
    <>
      <Col span={16}>
        <Alert message={children} type='info'></Alert>
      </Col>

      <br />
    </>
  );
};

export default Message;
