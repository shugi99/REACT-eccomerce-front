import React, { useState, useEffect } from 'react';
import AdminNav from '../../../components/nav/AdminNav';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { createProduct } from '../../../functions/product';
import ProductCreateForm from '../../../components/forms/ProductCreateForm';
import { getCategories, getCategorySubs } from '../../../functions/category';
import FileUpload from '../../../components/forms/FileUpload';
import { LoadingOutlined } from '@ant-design/icons';
import AdminNavResponsive from '../../../components/nav/AdminNavResponsive';
import { Col, Row } from 'antd';
import Loader from '../../../components/loader/Loader';

const initialState = {
  title: '',
  description: '',
  price: '',
  categories: [],
  category: '',
  subs: [],
  shipping: 'No',
  quantity: '',
  images: [],
  colors: ['Black', 'Brown', 'Silver', 'White', 'Blue'],
  brands: ['Apple', 'Samsung', 'Microsoft', 'Lenovo', 'ASUS'],
  color: 'White',
  brand: 'Apple',
};

const ProductCreate = () => {
  const [values, setValues] = useState(initialState);
  const [subOptions, setSubOptions] = useState([]);
  const [showSub, setShowSub] = useState(false);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  // redux
  // redux
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    const loadCategories = () =>
      getCategories().then((c) => setValues({ ...values, categories: c.data }));
    loadCategories();
  }, []);

  const handleSubmit = () => {
    createProduct(values, userInfo.token)
      .then((res) => {
        console.log(res);
        window.alert(`"${res.data.title}" is created`);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        // if (err.response.status === 400) toast.error(err.response.data);
        toast.error(err.response.data.err);
      });
  };

  const handleChange = (name) => (e) => {
    setValues({ ...values, [name]: e.target.value });
    console.log(values);
  };

  const handleCatagoryChange = (value) => {
    console.log('CLICKED CATEGORY', value);
    setValues({ ...values, subs: [], category: value });
    getCategorySubs(value).then((res) => {
      console.log('SUB OPTIONS ON CATGORY CLICK', res);
      setSubOptions(res.data);
    });
    setShowSub(true);
  };

  return (
    <div className='container-fluid2'>
      <Row gutter={[16, 0]}>
        <AdminNavResponsive
          visible={visible}
          onClose={onClose}
          showDrawer={showDrawer}
        />

        <Col
          span={18}
          xs={{ span: 24 }}
          sm={{ span: 24 }}
          md={{ offset: 2, span: 12 }}
        >
          {loading ? (
            <Loader />
          ) : (
            <div className='block2'>
              <div className='titleHolder2'>
                <h2>Create Product</h2>
              </div>
            </div>
          )}

          {/* {JSON.stringify(values.images)} */}

          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              paddingBottom: '5px',
            }}
          >
            <FileUpload
              values={values}
              setValues={setValues}
              setLoading={setLoading}
            />
          </div>

          <ProductCreateForm
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            setValues={setValues}
            values={values}
            handleCatagoryChange={handleCatagoryChange}
            subOptions={subOptions}
            showSub={showSub}
          />
        </Col>
      </Row>
    </div>
  );
};

export default ProductCreate;
