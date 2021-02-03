import React from 'react';
import { Spin } from 'antd';

const Loader = () => {
  return (
    <>
      <div
        style={{
          display: 'grid',
          height: '80vh',
          placeContent: 'center',
        }}
      >
        <Spin size='large' />
      </div>
    </>
  );
};

export default Loader;
