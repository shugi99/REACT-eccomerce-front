import React, { useState } from 'react';
import { Card, Col, Row, Tabs, Tooltip } from 'antd';
import { Button } from 'antd';

import { HeartOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Laptop from '../../images/laptop.png';
import ProductListItems from './ProductListItems';
import StarRating from 'react-star-ratings';
import RatingModal from '../modal/RatingModal';
import { showAverage } from '../../functions/rating';
import _ from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import { addToWishlist } from '../../functions/user';
import { toast } from 'react-toastify';
import { Link, useHistory } from 'react-router-dom';

const { TabPane } = Tabs;

// this is childrend component of Product page
const SingleProduct = ({ product, onStarClick, star }) => {
  const [tooltip, setTooltip] = useState('Click to add');

  // redux

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const dispatch = useDispatch();
  // router
  let history = useHistory();

  const { title, images, description, _id } = product;

  const handleAddToCart = () => {
    // create cart array
    let cart = [];
    if (typeof window !== 'undefined') {
      // if cart is in local storage GET it
      if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'));
      }
      // push new product to cart
      cart.push({
        ...product,
        count: 1,
      });
      // remove duplicates
      let unique = _.uniqWith(cart, _.isEqual);
      // save to local storage

      localStorage.setItem('cart', JSON.stringify(unique));
      // show tooltip
      setTooltip('Added');

      // add to reeux state
      dispatch({
        type: 'ADD_TO_CART',
        payload: unique,
      });
      // show cart items in side drawer
      dispatch({
        type: 'SET_VISIBLE',
        payload: true,
      });
    }
  };

  const handleAddToWishlist = (e) => {
    e.preventDefault();
    addToWishlist(product._id, userInfo.token).then((res) => {
      toast.success('Added to wishlist');
      history.push('/user/wishlist');
    });
  };

  return (
    <>
      <Col md={{ offset: 8, span: 24 }} sm={{ offset: 6 }}>
        <h1>{title}</h1>
      </Col>
      <Row>
        <div className='col-md-7'>
          {images && images.length ? (
            <Carousel showArrows={true} autoPlay infiniteLoop>
              {images &&
                images.map((i) => (
                  <img src={i.url} key={i.public_id} alt='description' />
                ))}
            </Carousel>
          ) : (
            <Card
              cover={
                <img
                  src={Laptop}
                  className='mb-3 card-image'
                  alt='description'
                />
              }
            ></Card>
          )}

          <Tabs type='card'>
            <TabPane tab='Description' key='1'>
              {description && description}
            </TabPane>
            <TabPane tab='More' key='2'>
              Call use on xxxx xxx xxx to learn more about this product.
            </TabPane>
          </Tabs>
        </div>

        <div className='col-md-5'>
          {product && product.ratings && product.ratings.length > 0 ? (
            showAverage(product)
          ) : (
            <div className='text-center pt-1 pb-3'>No rating yet</div>
          )}

          <Card
            actions={[
              <Tooltip placement='top' title={tooltip}>
                <Link onClick={handleAddToCart} disabled={product.quantity < 1}>
                  <ShoppingCartOutlined className='text-danger' />
                  <br />
                  {product.quantity < 1 ? 'Out of Stock' : 'Add To Cart'}
                </Link>
              </Tooltip>,
              <Link onClick={handleAddToWishlist}>
                <HeartOutlined className='text-info' /> <br /> Add to Wishlist
              </Link>,
              <RatingModal>
                <StarRating
                  name={_id}
                  numberOfStars={5}
                  rating={star}
                  changeRating={onStarClick}
                  isSelectable={true}
                  starRatedColor='red'
                />
              </RatingModal>,
            ]}
          >
            <ProductListItems product={product} />
          </Card>
        </div>
      </Row>
    </>
  );
};

export default SingleProduct;
