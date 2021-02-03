import { Button, Col, Row } from 'antd';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import ProductCardInCheckout from '../components/cards/ProductCardInCheckout';
import { userCart } from '../functions/user';

const Cart = ({ history }) => {
  const { cart } = useSelector((state) => ({ ...state }));
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const dispatch = useDispatch();

  const getTotal = () => {
    return cart.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0);
  };

  const saveOrderToDb = () => {
    // console.log("cart", JSON.stringify(cart, null, 4));
    userCart(cart, userInfo.token)
      .then((res) => {
        console.log('CART POST RES', res);
        if (res.data.ok) history.push('/checkout');
      })
      .catch((err) => console.log('cart save err', err));
  };

  const saveCashOrderToDb = () => {
    // console.log("cart", JSON.stringify(cart, null, 4));
    dispatch({
      type: 'COD',
      payload: true,
    });
    userCart(cart, userInfo.token)
      .then((res) => {
        console.log('CART POST RES', res);
        if (res.data.ok) history.push('/checkout');
      })
      .catch((err) => console.log('cart save err', err));
  };

  const showCartItems = () => (
    <table className='table table-bordered'>
      <thead className='thead-light'>
        <tr>
          <th scope='col'>Image</th>
          <th scope='col'>Title</th>
          <th scope='col'>Price</th>
          <th scope='col'>Brand</th>
          <th scope='col'>Color</th>
          <th scope='col'>Count</th>
          <th scope='col'>Shipping</th>
          <th scope='col'>Remove</th>
        </tr>
      </thead>

      {cart.map((p) => (
        <ProductCardInCheckout key={p._id} p={p} />
      ))}
    </table>
  );

  return (
    <div className='container-fluid'>
      <Row gutter={[16, 16]}>
        <Col span={16} xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 16 }}>
          <div className='block2'>
            <div className='titleHolder'>
              <h4>{cart.length} products in Cart</h4>
            </div>
          </div>{' '}
          {!cart.length ? (
            <p>
              No products in cart. <Link to='/shop'>Continue Shopping.</Link>
            </p>
          ) : (
            showCartItems()
          )}
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
              <strong>Products</strong>
            </p>
            {cart.map((c, i) => (
              <div key={i}>
                <p>
                  {c.title} x {c.count} = ${c.price * c.count}
                </p>
              </div>
            ))}
            <hr />
            <strong>Total:</strong> <b>${getTotal()}</b>
            <hr />
            {userInfo ? (
              <>
                <Button
                  onClick={saveOrderToDb}
                  type='primary'
                  disabled={!cart.length}
                >
                  Pay via stripe
                </Button>
                <br />
                <br />
                <Button
                  onClick={saveCashOrderToDb}
                  type='secondary'
                  disabled={!cart.length}
                >
                  Pay Cash on Delivery
                </Button>
              </>
            ) : (
              <Button type='primary'>
                <Link
                  to={{
                    pathname: '/login',
                    state: { from: 'cart' },
                  }}
                >
                  Login to Checkout
                </Link>
              </Button>
            )}
          </Col>
        </Col>
      </Row>
    </div>
  );
};

export default Cart;
