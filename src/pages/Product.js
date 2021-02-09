import React, { useEffect, useState } from 'react';
import { getProduct, productStar } from '../functions/product';
import SingleProduct from '../components/cards/SingleProduct';
import { useSelector } from 'react-redux';
import { getRelated } from '../functions/product';
import ProductCard from '../components/cards/ProductCard';
import { Col, Row } from 'antd';
import AppFooter from '../components/footer/AppFooter';

const Product = ({ match }) => {
  const [product, setProduct] = useState({});
  const [related, setRelated] = useState([]);
  const [star, setStar] = useState(0);
  const [loading, setLoading] = useState(false);
  const [callback, setCallback] = useState(false);
  // redux
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const { slug } = match.params;

  useEffect(() => {
    const loadSingleProduct = () => {
      setLoading(true);
      getProduct(slug).then((res) => {
        setProduct(res.data);
        // load related
        getRelated(res.data._id).then((res) => setRelated(res.data));
        setLoading(false);
      });
    };
    loadSingleProduct();
  }, [slug, callback]);

  useEffect(() => {
    if (product.ratings && userInfo) {
      let existingRatingObject = product.ratings.find(
        (ele) => ele.postedBy.toString() === userInfo._id.toString()
      );
      existingRatingObject && setStar(existingRatingObject.star); // current user's star
    }
  }, [product.ratings, userInfo]);

  const onStarClick = (newRating, name) => {
    setStar(newRating);
    console.table(newRating, name);
    productStar(name, newRating, userInfo.token).then((res) => {
      setCallback(!callback);
    });
  };

  return (
    <>
      <div className='container-fluid'>
        <div style={{ paddingTop: '24px' }}>
          <Row>
            <SingleProduct
              product={product}
              onStarClick={onStarClick}
              star={star}
            />
          </Row>

          <div className='block2'>
            <div className='titleHolder'>
              <h4>Related Products</h4>
            </div>
          </div>

          <Row gutter={[16, 16]}>
            {related.length ? (
              related.map((r) => (
                <Col
                  key={r._id}
                  xs={{ span: 24 }}
                  sm={{ span: 24 }}
                  md={{ span: 8 }}
                >
                  <ProductCard product={r} />
                </Col>
              ))
            ) : (
              <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }}>
                <div className='block5'>
                  <div className='titleHolder2'>No Products Found</div>
                </div>
              </Col>
            )}
          </Row>
        </div>
      </div>
      <br />
      <br />
      <AppFooter />
    </>
  );
};

export default Product;
