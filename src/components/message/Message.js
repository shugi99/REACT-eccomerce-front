import React from 'react';
import { Alert } from 'antd';

const Message = ({ variant, children }) => {
  return <Alert variant={variant}>{children}</Alert>;
};

Message.defaultProps = {
  variant: 'info',
};
export default Message;
