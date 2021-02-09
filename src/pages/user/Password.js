import { Col, Row } from 'antd';
import React, { useState, useEffect } from 'react';
import Loader from '../../components/loader/Loader';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import UserNavResponsive from '../../components/nav/UserNavResponsive';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { currentUser, updateUser } from '../../functions/auth';
import { toast } from 'react-toastify';

const Password = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState('');

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [form] = Form.useForm();

  useEffect(() => {
    currentUser(userInfo.token).then((c) => {
      form.setFieldsValue({
        name: c.data.name,
        email: c.data.email,
        password: '',
        confirmPassword: '',
      });
    });
  }, [userInfo]);
  const submitHandler = (e) => {
    if (e.password !== e.confirmPassword) {
      toast.error('Password does not match');
    } else {
      updateUser(e, userInfo.token)
        .then((res) => {
          setLoading(false);
          toast.success(`Account is updated`);
        })
        .catch((err) => {
          setLoading(false);
          toast.error(err.response.data.err);
        });
    }
  };

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const profileUpdateForm = () => (
    <>
      <Form
        form={form}
        name='normal_login'
        className='login-form'
        onFinish={submitHandler}
      >
        <Form.Item
          name='name'
          onChange={(e) => setName(e.target.value)}
          rules={[
            {
              required: true,
              message: 'Please input your Name.',
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className='site-form-item-icon' />}
            placeholder='Name'
          />
        </Form.Item>
        <Form.Item
          name='email'
          onChange={handleChange}
          rules={[
            {
              required: true,
              message: 'Please input your Email Address!',
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className='site-form-item-icon' />}
            placeholder='Email Address'
          />
        </Form.Item>
        <Form.Item
          name='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        >
          <Input.Password
            prefix={<LockOutlined className='site-form-item-icon' />}
            type='password'
            placeholder='Enter new password'
          />
        </Form.Item>

        <Form.Item
          name='confirmPassword'
          value={password}
          onChange={(e) => setConfirmPassword(e.target.value)}
        >
          <Input.Password
            prefix={<LockOutlined className='site-form-item-icon' />}
            type='password'
            placeholder='Confirm new password'
          />
        </Form.Item>

        <Form.Item>
          <Button
            type='primary'
            htmlType='submit'
            className='login-form-button'
            onSubmit={submitHandler}
          >
            Update
          </Button>

          {/* Or <Link to='/register'>Register</Link> */}
        </Form.Item>
      </Form>
    </>
  );

  return (
    <div className='container-fluid2'>
      <Row gutter={[16, 0]}>
        <UserNavResponsive
          visible={visible}
          onClose={onClose}
          showDrawer={showDrawer}
        />
        <Col
          span={18}
          xs={{ span: 24 }}
          sm={{ span: 24 }}
          md={{ offset: 2, span: 12 }}
        >
          <div className='block2'>
            <div className='titleHolder2'>
              {loading ? (
                <Loader />
              ) : (
                <div className='block4'>
                  <div className='titleHolder2'>
                    <h2>Update Account</h2>
                  </div>
                </div>
              )}
              {profileUpdateForm()}
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Password;
