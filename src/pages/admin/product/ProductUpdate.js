import React, { useState, useEffect } from 'react';
import AdminNav from '../../../components/nav/AdminNav';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { getProduct, updateProduct } from '../../../functions/product';
import { getCategories, getCategorySubs } from '../../../functions/category';
import FileUpload from '../../../components/forms/FileUpload';
import { LoadingOutlined } from '@ant-design/icons';
import ProductUpdateForm from '../../../components/forms/ProductUpdateForm';
import { Form, Input, InputNumber, Button, Select, Row, Col } from 'antd';
import AdminNavResponsive from '../../../components/nav/AdminNavResponsive';
import Loader from '../../../components/loader/Loader';

const { Option } = Select;

const initialState = {
  title: '',
  description: '',
  price: '',
  category: '',
  subs: [],
  shipping: '',
  quantity: '',
  images: [],
  colors: ['Black', 'Brown', 'Silver', 'White', 'Blue'],
  brands: ['Apple', 'Samsung', 'Microsoft', 'Lenovo', 'ASUS'],
  color: '',
  brand: '',
};

const ProductUpdate = ({ match, history }) => {
  // state
  const [values, setValues] = useState(initialState);
  const {
    title,
    description,
    price,
    category,

    shipping,
    quantity,
    subs,
    colors,
    brands,
    color,
    brand,
  } = values;
  const [categories, setCategories] = useState([]);
  const [subOptions, setSubOptions] = useState([]);
  const [arrayOfSubs, setArrayOfSubs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(false);
  const [callback, setCallback] = useState(false);

  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };

  const [form] = Form.useForm();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  // router
  const { slug } = match.params;

  const handleChange = (name) => (e) => {
    setValues({ ...values, [name]: e.target.value });
    console.log(values);
  };

  useEffect(() => {
    const loadCategories = () =>
      getCategories().then((c) => {
        setCategories(c.data);
      });

    const loadProduct = () => {
      getProduct(slug).then((p) => {
        // console.log("single product", p);
        // 1 load single proudct

        form.setFieldsValue({
          Title: p.data.title,
          Description: p.data.description,
          Price: p.data.price,
          Quantity: p.data.quantity,
          Shipping: p.data.shipping,
          Color: p.data.color,
          Category: p.data.category.name,
          Brand: p.data.brand,
        });
        setValues({ ...values, ...p.data });

        // 2 load single product category subs
        getCategorySubs(p.data.category._id).then((res) => {
          setSubOptions(res.data); // on first load, show default subs
        });

        // 3 prepare array of sub ids to show as default sub values in antd Select
        let arr = [];
        p.data.subs.forEach((s) => {
          arr.push(s._id);
        });
        console.log('ARR', arr);
        setArrayOfSubs((prev) => arr); // required for ant design select to work
        form.setFieldsValue({ Subs: arr });
        setLoading(false);
      });
    };
    const fetchAPI = () => {
      setLoading(true);
      loadCategories();
      loadProduct();
    };

    fetchAPI();
  }, [slug, form]);

  const handleSubmit = (e) => {
    setLoading(true);

    values.subs = arrayOfSubs;
    values.category = selectedCategory ? selectedCategory : e.category;

    updateProduct(slug, values, userInfo.token)
      .then((res) => {
        setLoading(false);
        toast.success(`"${res.data.title}" is updated`);
        history.push('/admin/products');
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err.response.data.err);
      });
  };

  const handleCategoryChange = (e) => {
    setValues({ ...values, subs: [] });

    setSelectedCategory(e);

    getCategorySubs(e).then((res) => {
      setSubOptions(res.data);
    });

    // if user clicks back to the original category
    // show its sub categories in default
    if (values.category._id === e) {
      getProduct(slug).then((p) => {
        // console.log("single product", p);
        // 1 load single proudct
        setValues({ ...values, ...p.data });
        // 2 load single product category subs
        getCategorySubs(p.data.category._id).then((res) => {
          setSubOptions(res.data); // on first load, show default subs
        });
        // 3 prepare array of sub ids to show as default sub values in antd Select
        let arr = [];
        p.data.subs.map((s) => {
          arr.push(s._id);
        });

        setArrayOfSubs((prev) => arr); // required for ant design select to work
        form.setFieldsValue({ Subs: arr });
      });
    }
    // clear old sub category ids
    setArrayOfSubs([]);
    form.setFieldsValue({ Subs: [] });
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
            <>
              <div className='block2'>
                <div className='titleHolder2'>
                  <h2>Product Update</h2>
                </div>
              </div>

              <ProductUpdateForm
                handleSubmit={handleSubmit}
                handleChange={handleChange}
                setValues={setValues}
                values={values}
                handleCategoryChange={handleCategoryChange}
                categories={categories}
                subOptions={subOptions}
                arrayOfSubs={arrayOfSubs}
                setArrayOfSubs={setArrayOfSubs}
                selectedCategory={selectedCategory}
                form={form}
              />
            </>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default ProductUpdate;
