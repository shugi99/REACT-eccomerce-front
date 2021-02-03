import React from 'react';
import { Form, Input, InputNumber, Button, Select } from 'antd';

const { Option } = Select;

const ProductUpdateForm = ({
  handleSubmit,
  handleChange,
  setValues,
  values,
  handleCategoryChange,
  categories,
  subOptions,
  arrayOfSubs,
  setArrayOfSubs,
  selectedCategory,
  form,
}) => {
  // destructure
  const {
    title,
    description,
    price,
    category,

    shipping,
    quantity,
    subs,
    colors,
    brands,
    color,
    brand,
  } = values;
  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };

  return (
    <>
      <Form
        form={form}
        name='control-hooks'
        onFinish={handleSubmit}
        {...layout}
      >
        <Form.Item name='Title' label='Title'>
          <Input value={title} onChange={handleChange('title')} />
        </Form.Item>
        <Form.Item name='Description' label='Description'>
          <Input value={description} onChange={handleChange('description')} />
        </Form.Item>
        <Form.Item
          name='Price'
          label='Price'
          rules={[
            {
              type: 'number',
              min: 0,
              max: 999999,
            },
          ]}
        >
          <InputNumber
            value={price}
            onChange={(v) => setValues({ ...values, price: v })}
          />
        </Form.Item>
        <Form.Item name='Shipping' label='Shipping'>
          <Select
            placeholder='Select a shipping '
            style={{ width: 420 }}
            onChange={(v) => setValues({ ...values, shipping: v })}
          >
            <Option value='Yes'>Free shipping</Option>
            <Option value='No'>Free shipping not available</Option>
          </Select>
        </Form.Item>
        <Form.Item name='Quantity' label='Quantity'>
          <InputNumber
            value={quantity}
            onChange={(v) => setValues({ ...values, quantity: v })}
          />
        </Form.Item>
        <Form.Item name='Color' label='Color'>
          <Select
            placeholder='Select a color'
            style={{ width: 420 }}
            onChange={(v) => setValues({ ...values, color: v })}
          >
            {colors.map((c) => (
              <Option key={c} value={c}>
                {c}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name='Brand' label='Brand'>
          <Select
            placeholder='Select a brand'
            style={{ width: 420 }}
            onChange={(v) => setValues({ ...values, brand: v })}
          >
            {brands.map((b) => (
              <Option key={b} value={b}>
                {b}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name='Category' label='Category'>
          <Select
            placeholder='Select a category'
            style={{ width: 420 }}
            onChange={handleCategoryChange}
          >
            {categories.length > 0 &&
              categories.map((c) => (
                <Option key={c._id} value={c._id}>
                  {c.name}
                </Option>
              ))}
          </Select>
        </Form.Item>

        <Form.Item
          noStyle
          shouldUpdate={(prevValues, currentValues) =>
            prevValues !== currentValues
          }
        >
          {({ getFieldValue }) => {
            return getFieldValue('Category') ? (
              <Form.Item name='Subs' label='Sub Category'>
                <Select
                  mode='multiple'
                  style={{ width: '100%' }}
                  placeholder='Please select'
                  onChange={(value) => setArrayOfSubs(value)}
                >
                  {subOptions.length &&
                    subOptions.map((s) => (
                      <Option key={s._id} value={s._id}>
                        {s.name}
                      </Option>
                    ))}
                </Select>
              </Form.Item>
            ) : null;
          }}
        </Form.Item>

        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type='primary' htmlType='submit'>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default ProductUpdateForm;
