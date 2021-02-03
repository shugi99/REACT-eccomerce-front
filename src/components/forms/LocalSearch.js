import React from 'react';
import { Input, Space } from 'antd';
import { AudioOutlined } from '@ant-design/icons';

const { Search } = Input;

const LocalSearch = ({ keyword, setKeyword }) => {
  const onSearch = (e) => {
    e.preventDefault();
    setKeyword(e.target.value.toLowerCase());
  };

  return (
    <Space direction='vertical' className='pb-3'>
      <Search
        placeholder='Search Category'
        enterButton='Search'
        size='large'
        onChange={onSearch}
        style={{ width: 300 }}
        size='medium'
      />
    </Space>
  );
};

export default LocalSearch;
