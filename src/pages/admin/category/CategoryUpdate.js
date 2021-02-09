import React, { useState, useEffect } from 'react';
import AdminNav from '../../../components/nav/AdminNav';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { getCategory, updateCategory } from '../../../functions/category';
import CategoryForm from '../../../components/forms/CategoryForm';
import { Col, Row } from 'antd';
import AdminNavResponsive from '../../../components/nav/AdminNavResponsive';
import Loader from '../../../components/loader/Loader';

const CategoryUpdate = ({ history, match }) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  useEffect(() => {
    const loadCategory = () => {
      getCategory(match.params.slug).then((c) => setName(c.data.name));
    };
    loadCategory();
  }, [match.params.slug]);

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);
    updateCategory(match.params.slug, { name }, userInfo.token)
      .then((res) => {
        setLoading(false);
        setName('');
        toast.success(`"${res.data.name}" is updated`);
        history.push('/admin/category');
      })
      .catch((err) => {
        setLoading(false);
        if (err.response.status === 400) toast.error(err.response.data);
      });
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
                <h2>Category Update</h2>
              </div>
            </div>
          )}

          <CategoryForm
            handleSubmit={handleSubmit}
            name={name}
            setName={setName}
          />

          <hr />
        </Col>
      </Row>
    </div>
  );
};

export default CategoryUpdate;
