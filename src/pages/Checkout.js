import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import {
  getUserCart,
  emptyUserCart,
  saveUserAddress,
  applyCoupon,
  createCashOrderForUser,
} from '../functions/user';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Button, Col, Input, Row } from 'antd';

const Checkout = ({ history }) => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [address, setAddress] = useState('');
  const [addressSaved, setAddressSaved] = useState(false);
  const [coupon, setCoupon] = useState('');
  // discount price
  const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);
  const [discountError, setDiscountError] = useState('');

  const dispatch = useDispatch();
  const { COD } = useSelector((state) => ({ ...state }));
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const couponTrueOrFalse = useSelector((state) => state.coupon);

  const onAddress = (e) => {
    setAddress(e.target.value);
  };

  useEffect(() => {
    getUserCart(userInfo.token).then((res) => {
      setProducts(res.data.products);
      setTotal(res.data.cartTotal);
    });
  }, [userInfo.token]);

  const emptyCart = () => {
    // remove from local storage
    if (typeof window !== 'undefined') {
      localStorage.removeItem('cart');
    }
    // remove from redux
    dispatch({
      type: 'ADD_TO_CART',
      payload: [],
    });
    // remove from backend
    emptyUserCart(userInfo.token).then((res) => {
      setProducts([]);
      setTotal(0);
      setTotalAfterDiscount(0);
      setCoupon('');
      toast.success('Cart is emapty. Contniue shopping.');
    });
  };

  const saveAddressToDb = () => {
    saveUserAddress(userInfo.token, address).then((res) => {
      if (res.data.ok) {
        setAddressSaved(true);
        toast.success('Address saved');
      }
    });
  };

  const applyDiscountCoupon = () => {
    applyCoupon(userInfo.token, coupon).then((res) => {
      if (res.data) {
        setTotalAfterDiscount(res.data);
        // update redux coupon applied true/false
        dispatch({
          type: 'COUPON_APPLIED',
          payload: true,
        });
      }
      // error
      if (res.data.err) {
        setDiscountError(res.data.err);
        // update redux coupon applied true/false
        dispatch({
          type: 'COUPON_APPLIED',
          payload: false,
        });
      }
    });
  };

  const showAddress = () => (
    <>
      <Input
        placeholder='Enter Address to continue'
        value={address}
        onChange={onAddress}
      />
      <br />
      <br />
      <Button type='primary' onClick={saveAddressToDb}>
        Use Address
      </Button>
    </>
  );

  const showProductSummary = () =>
    products.map((p, i) => (
      <div key={i}>
        <p>
          <strong>{p.product.title}</strong> ({p.color}) x {p.count} ={' '}
          {p.product.price * p.count}
        </p>
      </div>
    ));

  const showApplyCoupon = () => (
    <>
      <Input
        onChange={(e) => {
          setCoupon(e.target.value);
          setDiscountError('');
        }}
        placeholder='FIFTY50'
        value={coupon}
        type='text'
        className='form-control'
      />
      <br />
      <br />
      <Button onClick={applyDiscountCoupon} type='primary'>
        Apply
      </Button>
    </>
  );

  const createCashOrder = () => {
    createCashOrderForUser(userInfo.token, COD, couponTrueOrFalse).then(
      (res) => {
        // empty cart form redux, local Storage, reset coupon, reset COD, redirect
        if (res.data.ok) {
          // empty local storage
          if (typeof window !== 'undefined') localStorage.removeItem('cart');
          // empty redux cart
          dispatch({
            type: 'ADD_TO_CART',
            payload: [],
          });
          // empty redux coupon
          dispatch({
            type: 'COUPON_APPLIED',
            payload: false,
          });
          // empty redux COD
          dispatch({
            type: 'COD',
            payload: false,
          });
          // mepty cart from backend
          emptyUserCart(userInfo.token);
          // redirect
          setTimeout(() => {
            history.push('/user/history');
          }, 1000);
        }
      }
    );
  };

  return (
    <div className='container-fluid'>
      <Row gutter={[16, 16]}>
        <Col span={16} xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 16 }}>
          <div className='block2'>
            <div className='titleHolderLeft'>
              <h4> Delivery Address</h4>
            </div>
          </div>
          <br />
          <Col span={16} xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 16 }}>
            {showAddress()}
            <br />
            <br />
            <div className='titleHolderLeft'>
              <h4>APPLY COUPON "FIFTY50" for 50% discount</h4>
            </div>
            {showApplyCoupon()}

            {discountError && <p className='bg-danger p-2'>{discountError}</p>}
          </Col>
        </Col>

        <Col span={8} xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }}>
          <Col offset={2}>
            <div className='block2'>
              <div className='titleHolder'>
                <h4>Order Summary</h4>
              </div>
            </div>{' '}
            <hr />
            <p>
              <strong>Products:</strong> {products.length}
            </p>
            <hr />
            {showProductSummary()}
            <hr />
            <p>
              <strong>Cart Total: </strong>
              {total}
            </p>
            {totalAfterDiscount > 0 && (
              <p className='bg-success p-2'>
                Discount Applied: Total Payable: ${totalAfterDiscount}
              </p>
            )}
            <div className='row'>
              <div className='col-md-6'>
                {COD ? (
                  <button
                    className='btn btn-primary'
                    disabled={!addressSaved || !products.length}
                    onClick={createCashOrder}
                  >
                    Place Order
                  </button>
                ) : (
                  <button
                    className='btn btn-primary'
                    disabled={!addressSaved || !products.length}
                    onClick={() => history.push('/payment')}
                  >
                    Place Order
                  </button>
                )}
              </div>

              <div className='col-md-6'>
                <button
                  disabled={!products.length}
                  onClick={emptyCart}
                  className='btn btn-primary'
                >
                  Empty Cart
                </button>
              </div>
            </div>
          </Col>
        </Col>
      </Row>
    </div>
  );
};

export default Checkout;
