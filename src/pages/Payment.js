import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import StripeCheckout from '../components/StripeCheckout';
import '../stripe.css';
import { Col, Row } from 'antd';

// load stripe outside of components render to avoid recreating stripe object on every render
const promise = loadStripe(process.env.REACT_APP_STRIPE_KEY);

const Payment = () => {
  return (
    <>
      <div className='container-fluid'>
        <Row>
          <Col>
            <Col offset={4}>
              <div className='block2'>
                <div className='titleHolder'>
                  <h4>Complete Purchase</h4>
                </div>
              </div>{' '}
            </Col>
            <Elements stripe={promise}>
              <Col
                span={16}
                xs={{ span: 24 }}
                sm={{ span: 24 }}
                md={{ span: 16, offset: 6 }}
              >
                <StripeCheckout />
              </Col>
            </Elements>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Payment;
