import React, { useState } from 'react';
import axios from 'axios';
import {
  Form,
  Input,
  InputNumber,
  Button,
  Row,
  Col,
  message,
  Spin,
} from 'antd';
import { toast } from 'react-toastify';
import Loader from '../loader/Loader';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const ContactForm = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const handleSubmit = (e) => {
    setLoading(true);
    axios({
      method: 'POST',
      url: `${process.env.REACT_APP_API}/send`,
      data: e,
    }).then((response) => {
      console.log('hey', response);
      if (response.data.status === 'success') {
        message.info('Message Sent.');
        form.resetFields();
      } else if (response.data.status === 'fail') {
        message.info('Message failed to send.');
      }
      setLoading(false);
    });
  };

  const validateMessages = {
    required: '${label} is required!',
    types: {
      email: '${label} is not a valid email!',
    },
  };

  const onReset = () => {
    form.resetFields();
  };
  return (
    <div className='container-fluid2' style={{ marginTop: '24px' }}>
      {loading ? (
        <Spin tip='Submitting...'>
          <Row>
            <Col md={{ offset: 6, span: 12 }}>
              <div className='block2'>
                <div className='titleHolder3'>
                  <h2>Contact Shugi</h2>
                </div>
              </div>
              <Form
                {...layout}
                name='nest-messages'
                form={form}
                onFinish={handleSubmit}
                validateMessages={validateMessages}
              >
                <Form.Item
                  name='name'
                  label='Name'
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name='email'
                  label='Email'
                  rules={[
                    {
                      type: 'email',
                      required: true,
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name='message'
                  label='Message'
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input.TextArea />
                </Form.Item>

                <Form.Item {...tailLayout}>
                  <Button type='primary' htmlType='submit'>
                    Submit
                  </Button>

                  {''}
                  <Button htmlType='button' onClick={onReset}>
                    Reset
                  </Button>
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </Spin>
      ) : (
        <Row>
          <Col md={{ offset: 6, span: 12 }}>
            <div className='block2'>
              <div className='titleHolder3'>
                <h2>Contact Shugi</h2>
              </div>
            </div>
            <Form
              {...layout}
              name='nest-messages'
              form={form}
              onFinish={handleSubmit}
              validateMessages={validateMessages}
            >
              <Form.Item
                name='name'
                label='Name'
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name='email'
                label='Email'
                rules={[
                  {
                    type: 'email',
                    required: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name='message'
                label='Message'
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input.TextArea />
              </Form.Item>

              <Form.Item {...tailLayout}>
                <Button type='primary' htmlType='submit'>
                  Submit
                </Button>

                {''}
                <Button htmlType='button' onClick={onReset}>
                  Reset
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default ContactForm;
