import React, { useEffect, useState } from 'react';
import { getProducts, getProductsCount } from '../../functions/product';
import ProductCard from '../cards/ProductCard';
import LoadingCard from '../cards/LoadingCard';
import { Pagination } from 'antd';
import { Row, Col, Slider } from 'antd';

const BestSellers = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [productsCount, setProductsCount] = useState(0);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const loadAllProducts = () => {
      setLoading(true);
      // sort, order, limit
      getProducts('sold', 'desc', page).then((res) => {
        setProducts(res.data);
        setLoading(false);
      });
    };

    loadAllProducts();
  }, [page]);

  useEffect(() => {
    getProductsCount().then((res) => setProductsCount(res.data));
  }, []);

  return (
    <>
      <div className='block featureBlock bgGray'>
        <div className='container-fluid'>
          <div className='titleHolder'>
            <h2>Best Sellers</h2>
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

        <div className='row'>
          <nav className='col-md-4 offset-md-4 text-center pt-5 p-3'>
            <Pagination
              current={page}
              total={(productsCount / 3) * 10}
              onChange={(value) => setPage(value)}
            />
          </nav>
        </div>
      </div>
    </>
  );
};

export default BestSellers;
