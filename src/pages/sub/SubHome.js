import React, { useState, useEffect } from 'react';
import { getSub } from '../../functions/sub';
import ProductCard from '../../components/cards/ProductCard';
import { Col, Row } from 'antd';
import AppFooter from '../../components/footer/AppFooter';

const SubHome = ({ match }) => {
  const [sub, setSub] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const { slug } = match.params;

  useEffect(() => {
    setLoading(true);
    getSub(slug).then((res) => {
      setSub(res.data.sub);
      setProducts(res.data.products);
      setLoading(false);
    });
  }, [slug]);

  return (
    <>
      <div className='block featureBlock bgGray'>
        <div className='container-fluid'>
          <div className='titleHolder'>
            <h2>
              {products.length} Products in {sub.name} category
            </h2>
          </div>

          <Row gutter={[16, 16]}>
            {products.map((p) => (
              <Col
                key={p._id}
                xs={{ span: 24 }}
                sm={{ span: 12 }}
                md={{ span: 8 }}
              >
                <ProductCard product={p} />
              </Col>
            ))}
          </Row>
        </div>
      </div>
      <AppFooter />
    </>
  );
};

export default SubHome;
