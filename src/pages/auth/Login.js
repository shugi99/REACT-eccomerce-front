import React, { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { login } from '../../functions/auth';
import { Form, Input, Button, Checkbox, message, Alert, Col } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import Message from '../../components/message/Message';

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};
const NormalLoginForm = ({ history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo, error, loading } = userLogin;

  useEffect(() => {
    // let intended = history.location.state;
    // if (intended) {
    //   return;
    // }
    if (userInfo) {
      history.push('/');
    }
  }, [history, userInfo]);

  let dispatch = useDispatch();

  // const roleBasedRedirect = (res) => {
  //   // check if intended
  //   let intended = history.location.state;
  //   if (intended) {
  //     history.push(intended.from);
  //   } else {
  //     if (res.data.role === 'admin') {
  //       history.push('/admin/dashboard');
  //     } else {
  //       history.push('/user/history');
  //     }
  //   }
  // };

  const handleSubmit = async (values) => {
    dispatch(login(email, password));
  };

  const handleChange = (e, name) => {
    setEmail(e.target.value);
  };

  return (
    <>
      <div className='container p-5'>
        <div className='row'>
          <div className='col-md-6 offset-md-3'>
            {error && <Message>{error}</Message>}
            <br />
            <Col span={16}>
              <Alert
                message='Login as admin (user: admin, pass: admin)'
                type='info'
              />
              <br />
            </Col>
            <h4>Login</h4>

            <Form
              {...layout}
              name='normal_login'
              className='login-form'
              initialValues={{
                remember: false,
              }}
              onFinish={handleSubmit}
            >
              <Form.Item
                name='email'
                value={email}
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
                  placeholder='admin'
                />
              </Form.Item>
              <Form.Item
                name='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                rules={[
                  {
                    required: true,
                    message: 'Please input your Password!',
                  },
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined className='site-form-item-icon' />}
                  type='password'
                  placeholder='admin'
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type='primary'
                  htmlType='submit'
                  className='login-form-button'
                  onSubmit={handleSubmit}
                >
                  Log in
                </Button>
                <div className='float-right'>
                  <Link to='/forgot-password'>Forgot password</Link>
                </div>
                <div className='pt-2'>
                  <Button className='' type='Secondary'>
                    <Link to='/register'>Have an account?</Link>
                  </Button>
                </div>

                {/* Or <Link to='/register'>Register</Link> */}
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default NormalLoginForm;
