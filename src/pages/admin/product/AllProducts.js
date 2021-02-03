import React, { useEffect, useState } from 'react';
import AdminNav from '../../../components/nav/AdminNav';
import { getProductsByCount } from '../../../functions/product';
import AdminProductCard from '../../../components/cards/AdminProductCard';
import Loader from '../../../components/loader/Loader';
import { removeProduct } from '../../../functions/product';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Col, Row } from 'antd';
import AdminNavResponsive from '../../../components/nav/AdminNavResponsive';

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  useEffect(() => {
    loadAllProducts();
  }, []);

  const loadAllProducts = () => {
    setLoading(true);
    getProductsByCount(100)
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  const handleRemove = (slug) => {
    // let answer = window.confirm("Delete?");
    if (window.confirm('Delete?')) {
      // console.log("send delete request", slug);
      removeProduct(slug, userInfo.token)
        .then((res) => {
          loadAllProducts();
          toast.error(`${res.data.title} is deleted`);
        })
        .catch((err) => {
          if (err.response.status === 400) toast.error(err.response.data);
          console.log(err);
        });
    }
  };

  return (
    <div className='container-fluid2'>
      <Row gutter={[16, 0]}>
        <AdminNavResponsive
          visible={visible}
          onClose={onClose}
          showDrawer={showDrawer}
        />

        <Col span={18} xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 18 }}>
          {loading ? (
            <Loader />
          ) : (
            <div className='block2'>
              <div className='titleHolder2'>
                <h2>All Products</h2>
              </div>
            </div>
          )}
          <Row gutter={[16, 16]}>
            {products.map((product) => (
              <Col
                key={product._id}
                xs={{ span: 24 }}
                sm={{ span: 12 }}
                md={{ span: 8 }}
              >
                <AdminProductCard
                  product={product}
                  handleRemove={handleRemove}
                />
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default AllProducts;
