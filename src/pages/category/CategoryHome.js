import React, { useState, useEffect } from 'react';
import { getCategory } from '../../functions/category';
import ProductCard from '../../components/cards/ProductCard';
import { Col, Row } from 'antd';
import AppFooter from '../../components/footer/AppFooter';

const CategoryHome = ({ match }) => {
  const [category, setCategory] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const { slug } = match.params;

  useEffect(() => {
    setLoading(true);
    getCategory(slug).then((res) => {
      console.log(JSON.stringify(res.data, null, 4));
      setCategory(res.data.category);
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
              {products.length} Products in {category.name} category
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

export default CategoryHome;
