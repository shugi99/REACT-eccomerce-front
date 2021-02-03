import React from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
const layout = {
  labelCol: {
    span: 4,
    wrapperCol: { span: 16 },
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: { offset: 4, span: 16 },
};

const CategoryForm = ({ handleSubmit, name, setName }) => (
  <Form onFinish={handleSubmit} {...layout} name='basic'>
    <Form.Item
      label='Name'
      name='name'
      rules={[
        {
          required: true,
          message: 'Please input your Category!',
        },
      ]}
    >
      <Input placeholder='Input Name' />
    </Form.Item>

    <Form.Item {...tailLayout}>
      <Button type='primary' htmlType='submit'>
        Submit
      </Button>
    </Form.Item>
  </Form>
);

export default CategoryForm;
