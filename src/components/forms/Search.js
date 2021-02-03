import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { SearchOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import Form from 'antd/lib/form/Form';

const Search = () => {
  const dispatch = useDispatch();
  const { search } = useSelector((state) => ({ ...state }));
  const { text } = search;

  const history = useHistory();

  const handleChange = (e) => {
    dispatch({
      type: 'SEARCH_QUERY',
      payload: { text: e.target.value },
    });
    console.log(e.target.value);
  };

  const handleSubmit = (e) => {
    console.log(e);
    history.push(`/shop?${e}`);
  };

  return (
    <Form onFinish={handleSubmit}>
      <Input onChange={handleChange} type='search' placeholder='Search' />
    </Form>
  );
};

export default Search;
