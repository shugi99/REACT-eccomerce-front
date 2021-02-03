import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import {
  getCoupons,
  removeCoupon,
  createCoupon,
} from '../../../functions/coupon';
import 'react-datepicker/dist/react-datepicker.css';
import { DeleteOutlined } from '@ant-design/icons';
import AdminNav from '../../../components/nav/AdminNav';
import {
  Table,
  Tag,
  DatePicker,
  Space,
  Row,
  Col,
  Input,
  InputNumber,
  Button,
  Form,
} from 'antd';
import AdminNavResponsive from '../../../components/nav/AdminNavResponsive';
import Loader from '../../../components/loader/Loader';
import { set } from 'lodash';

const CreateCouponPage = () => {
  const [name, setName] = useState('');
  const [expiry, setExpiry] = useState('');
  const [discount, setDiscount] = useState('');
  const [loading, setLoading] = useState('');
  const [coupons, setCoupons] = useState([]);
  const [callback, setCallback] = useState(true);

  const [visible, setVisible] = useState(false);

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

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
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

  // redux
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    const loadAllCoupons = () =>
      getCoupons().then((res) => setCoupons(res.data));

    loadAllCoupons();
  }, [callback]);

  const handleSubmit = (e) => {
    setLoading(true);
    // console.table(name, expiry, discount);
    createCoupon(e, userInfo.token)
      .then((res) => {
        setLoading(false);
        setCallback(!callback);
        setName('');
        setDiscount('');
        setExpiry('');
        toast.success(`"${res.data.name}" is created`);
      })
      .catch((err) => console.log('create coupon err', err));
  };

  const handleRemove = (couponId) => {
    if (window.confirm('Delete?')) {
      setLoading(true);
      removeCoupon(couponId, userInfo.token)
        .then((res) => {
          setCallback(!callback);
          setLoading(false);
          toast.error(`Coupon "${res.data.name}" deleted`);
        })
        .catch((err) => console.log(err));
    }
  };

  function onChange(value, dateString) {
    setExpiry(value);
    console.log('Formatted Selected Time: ', dateString);
  }
  function onOk(value) {
    console.log('onOk: ', value);
  }

  return (
    <>
      <div className='container-fluid2'>
        <Row gutter={[16, 0]}>
          <AdminNavResponsive
            visible={visible}
            onClose={onClose}
            showDrawer={showDrawer}
          />
          <Col span={18} xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 18 }}>
            {loading ? (
              <Loader />
            ) : (
              <>
                <div className='block2'>
                  <div className='titleHolder'>
                    <h2>Sub Category Create</h2>
                  </div>
                </div>
                {/* <form onSubmit={handleSubmit}>
                  <div className='form-group'>
                    <label className='text-muted'>Name</label>
                    <input
                      type='text'
                      className='form-control'
                      onChange={(e) => setName(e.target.value)}
                      value={name}
                      autoFocus
                      required
                    />
                  </div>

                  <div className='form-group'>
                    <label className='text-muted'>Discount %</label>
                    <input
                      type='text'
                      className='form-control'
                      onChange={(e) => setDiscount(e.target.value)}
                      value={discount}
                      required
                    />
                  </div>

                  <div className='form-group'>
                    <label className='text-muted'>Expiry</label>
                    <br />
                    <Space direction='vertical' size={50}>
                      <DatePicker
                        format='MM-DD-YYYY HH:mm'
                        onChange={onChange}
                        onOk={onOk}
                      />
                    </Space>
                    ,
                  </div>

                  <button className='btn btn-outline-primary'>Save</button>
                </form> */}

                <Form
                  onFinish={handleSubmit}
                  {...layout}
                  validateMessages={validateMessages}
                >
                  <Form.Item
                    name='name'
                    label='Coupon'
                    rules={[
                      {
                        required: true,
                        min: 6,
                        message: 'Coupon code should be atleast 6 characters',
                      },
                    ]}
                  >
                    <Input placeholder='Coupon code' />
                  </Form.Item>

                  <Form.Item
                    label='Discount'
                    name='discount'
                    rules={[
                      {
                        type: 'number',
                        required: true,
                        min: 0,
                        max: 100,
                      },
                    ]}
                  >
                    <InputNumber />
                  </Form.Item>
                  <Form.Item
                    label='Expiry'
                    name='expiry'
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <DatePicker
                      format='MM-DD-YYYY HH:mm'
                      onChange={onChange}
                      onOk={onOk}
                    />
                  </Form.Item>

                  <Form.Item {...tailLayout}>
                    <Button type='primary' htmlType='submit'>
                      Submit
                    </Button>
                  </Form.Item>
                </Form>

                <br />

                <h4>{coupons.length} Coupons</h4>

                <table className='table table-bordered'>
                  <thead className='thead-light'>
                    <tr>
                      <th scope='col'>Name</th>
                      <th scope='col'>Expiry</th>
                      <th scope='col'>Discount</th>
                      <th scope='col'>Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {coupons.map((c, i) => (
                      <tr key={i}>
                        <td>{c.name}</td>
                        <td>{new Date(c.expiry).toLocaleDateString()}</td>
                        <td>{c.discount}%</td>
                        <td>
                          <DeleteOutlined
                            onClick={() => handleRemove(c._id)}
                            className='text-danger pointer'
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            )}
          </Col>
        </Row>
      </div>
    </>
  );
};

export default CreateCouponPage;
