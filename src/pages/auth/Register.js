import React, { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../functions/auth';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const Register = ({ history }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) history.push('/');
  }, [userInfo, history]);

  const handleSubmit = async () => {
    if (password !== confirmPassword) {
      alert('Passwords do not match');
    } else {
      dispatch(register(name, email, password));
    }
  };

  const registerForm = () => (
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
        name='name'
        value={name}
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
        value={email}
        onChange={(e) => setEmail(e.target.value)}
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
          placeholder='Password'
        />
      </Form.Item>
      <Form.Item
        name='confirmpassword'
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
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
          placeholder='Confirm Password'
        />
      </Form.Item>

      <Form.Item>
        <Button
          type='primary'
          htmlType='submit'
          className='login-form-button'
          onSubmit={handleSubmit}
        >
          Register
        </Button>
        <div className='float-right'>
          <Link to='/login'>Have an account?</Link>
        </div>
        {/* Or <Link to='/register'>Register</Link> */}
      </Form.Item>
    </Form>
  );

  return (
    <div className='container p-5'>
      <div className='row'>
        <div className='col-md-6 offset-md-3'>
          <h4>Register</h4>
          {registerForm()}
        </div>
      </div>
    </div>
  );
};

export default Register;
