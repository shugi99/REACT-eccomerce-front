import React, { useEffect, useState } from 'react';
import { getProducts, getProductsCount } from '../../functions/product';
import ProductCard from '../cards/ProductCard';
import LoadingCard from '../cards/LoadingCard';
import { Pagination } from 'antd';
import { Row, Col, Slider } from 'antd';

const NewArrivals = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [productsCount, setProductsCount] = useState(0);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const loadAllProducts = () => {
      setLoading(true);
      // sort, order, limit
      getProducts('createdAt', 'desc', page).then((res) => {
        setProducts(res.data);
        setLoading(false);
      });
    };
    loadAllProducts();
    getProductsCount().then((res) => setProductsCount(res.data));
  }, [page]);

  // useEffect(() => {
  //   getProductsCount().then((res) => setProductsCount(res.data));
  // }, []);

  return (
    <>
      <div id='about' className='block aboutBlock'>
        <div className='container-fluid'>
          <div className='titleHolder'>
            <h2>New Arrivals</h2>
          </div>
          {loading ? (
            <LoadingCard count={3} />
          ) : (
            <Row gutter={[16, 16]}>
              {products.map((product) => (
                <Col
                  key={product._id}
                  xs={{ span: 24 }}
                  sm={{ span: 12 }}
                  md={{ span: 8 }}
                >
                  <ProductCard product={product} />
                </Col>
              ))}
            </Row>
          )}
        </div>

        <Row>
          <nav className='col-md-4 offset-md-4 text-center pt-5 p-3'>
            <Pagination
              current={page}
              total={(productsCount / 3) * 10}
              onChange={(value) => setPage(value)}
            />
          </nav>
        </Row>
      </div>
    </>
  );
};

export default NewArrivals;
