import React from 'react';
import { Form, Input, InputNumber, Button, Select } from 'antd';

const { Option } = Select;

const ProductCreateForm = ({
  handleSubmit,
  handleChange,
  setValues,
  values,
  handleCatagoryChange,
  subOptions,
  showSub,
  handleChange1,
  handleChange2,
}) => {
  // destructure
  const {
    title,
    description,
    price,
    categories,

    subs,

    quantity,

    colors,
    brands,
  } = values;

  const layout = {
    labelCol: {
      span: 8,
      wrapperCol: { span: 16 },
    },
    wrapperCol: {
      span: 16,
    },
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };
  const validateMessages = {
    required: '${label} is required!',
    types: {
      number: '${label} is not a valid number!',
    },
    number: {
      range: '${label} must be between ${min} and ${max}',
    },
  };

  return (
    <>
      <Form
        {...layout}
        name='nest-messages'
        onFinish={handleSubmit}
        validateMessages={validateMessages}
      >
        <Form.Item
          name='title'
          label='Title'
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input value={title} onChange={handleChange('title')} />
        </Form.Item>
        <Form.Item
          name='Description'
          label='Description'
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input value={description} onChange={handleChange('description')} />
        </Form.Item>
        <Form.Item
          name={'price'}
          label='Price'
          rules={[
            {
              type: 'number',
              min: 0,
              max: 999999,
              required: true,
            },
          ]}
        >
          <InputNumber
            value={price}
            onChange={(v) => setValues({ ...values, price: v })}
          />
        </Form.Item>
        <Form.Item
          name='shipping'
          label='Shipping'
          rules={[{ required: true }]}
        >
          <Select
            placeholder='Select a shipping '
            onChange={(v) => setValues({ ...values, shipping: v })}
          >
            <Option value='Yes'>Free shipping</Option>
            <Option value='No'>Free shipping not available</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name={'quantiy'}
          label='Quantity'
          rules={[
            {
              type: 'number',
              min: 0,
              max: 999999,
              required: true,
            },
          ]}
        >
          <InputNumber
            value={quantity}
            onChange={(v) => setValues({ ...values, quantity: v })}
          />
        </Form.Item>
        <Form.Item name={['color']} label='Color'>
          <Select
            placeholder='Select a color'
            onChange={(v) => setValues({ ...values, color: v })}
          >
            {colors.map((c) => (
              <Option key={c} value={c}>
                {c}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name={['brand']} label='Brand'>
          <Select
            placeholder='Select a brand'
            onChange={(v) => setValues({ ...values, brand: v })}
          >
            {brands.map((b) => (
              <Option key={b} value={b}>
                {b}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name={['category']}
          label='Category'
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select
            placeholder='Select a category'
            onChange={handleCatagoryChange}
          >
            {categories.length > 0 &&
              categories.map((c) => (
                <Option key={c._id} value={c._id}>
                  {c.name}
                </Option>
              ))}
          </Select>
        </Form.Item>

        {showSub && (
          <Form.Item name={'subs'} label='Sub Category'>
            <Select
              mode='multiple'
              placeholder='Please select'
              value={subs}
              onChange={(value) => setValues({ ...values, subs: value })}
            >
              {subOptions.length &&
                subOptions.map((s) => (
                  <Option key={s._id} value={s._id}>
                    {s.name}
                  </Option>
                ))}
            </Select>
          </Form.Item>
        )}

        <Form.Item {...tailLayout}>
          <Button type='primary' htmlType='submit'>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default ProductCreateForm;
