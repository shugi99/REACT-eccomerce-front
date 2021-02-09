import React, { useState, useEffect } from 'react';
import UserNav from '../../components/nav/UserNav';
import { getWishlist, removeWishlist } from '../../functions/user';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { DeleteOutlined } from '@ant-design/icons';
import { Col, Row } from 'antd';
import UserNavResponsive from '../../components/nav/UserNavResponsive';

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const [callback, setCallback] = useState(false);

  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  useEffect(() => {
    const loadWishlist = () =>
      getWishlist(userInfo.token).then((res) => {
        setWishlist(res.data.wishlist);
      });
    loadWishlist();
  }, [callback, userInfo.token]);

  const handleRemove = (productId) =>
    removeWishlist(productId, userInfo.token).then((res) => {
      setCallback(!callback);
    });

  return (
    <div className='container-fluid2'>
      <Row gutter={[16, 0]}>
        <UserNavResponsive
          visible={visible}
          onClose={onClose}
          showDrawer={showDrawer}
        />
        <Col span={18} xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 18 }}>
          <div className='block2'>
            <div className='titleHolder2'>
              <h2>Wishlist</h2>
            </div>

            {wishlist.length > 0 ? (
              wishlist.map((p) => (
                <div key={p._id} className='alert alert-secondary'>
                  <Link to={`/product/${p.slug}`}>{p.title}</Link>
                  <span
                    onClick={() => handleRemove(p._id)}
                    className='btn btn-sm float-right'
                  >
                    <DeleteOutlined className='text-danger' />
                  </span>
                </div>
              ))
            ) : (
              <div className='block2'>Add items to your wishlist</div>
            )}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Wishlist;
