import React, { useState, useEffect } from 'react';
import AdminNav from '../../../components/nav/AdminNav';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import {
  createCategory,
  getCategories,
  removeCategory,
} from '../../../functions/category';
import { Link } from 'react-router-dom';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import CategoryForm from '../../../components/forms/CategoryForm';
import LocalSearch from '../../../components/forms/LocalSearch';
import { Alert, Button, Col, Input, Row } from 'antd';
import AdminNavResponsive from '../../../components/nav/AdminNavResponsive';
import Loader from '../../../components/loader/Loader';
import Form from 'antd/lib/form/Form';

const CategoryCreate = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  // step 1
  const [keyword, setKeyword] = useState('');
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
      span: 4,
      wrapperCol: { span: 16 },
    },
    wrapperCol: {
      span: 16,
    },
  };
  const tailLayout = {
    wrapperCol: { offset: 4, span: 16 },
  };

  useEffect(() => {
    const loadCategories = () => {
      getCategories().then((c) => setCategories(c.data));
    };
    loadCategories();
  }, [callback]);

  const handleSubmit = (e) => {
    setLoading(true);
    createCategory(e, userInfo.token)
      .then((res) => {
        // console.log(res)
        setLoading(false);
        setName('');
        toast.success(`"${res.data.name}" is created`);
        setCallback(!callback);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        if (err.response.status === 400) toast.error(err.response.data);
      });
  };

  const handleRemove = async (slug) => {
    // let answer = window.confirm("Delete?");
    // console.log(answer, slug);
    if (window.confirm('Delete?')) {
      setLoading(true);
      removeCategory(slug, userInfo.token)
        .then((res) => {
          setLoading(false);
          toast.error(`${res.data.name} deleted`);
          setCallback(!callback);
        })
        .catch((err) => {
          if (err.response.status === 400) {
            setLoading(false);
            toast.error(err.response.data);
          }
        });
    }
  };

  // step 4
  const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword);

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
            <>
              <div className='block2'>
                <div className='titleHolder'>
                  <h2>Category Create</h2>
                </div>
              </div>
              <Col
                xs={{ span: 24 }}
                sm={{ span: 24 }}
                md={{ offset: 2, span: 18 }}
              >
                <CategoryForm
                  handleSubmit={handleSubmit}
                  name={name}
                  setName={setName}
                />
              </Col>
              <div className='titleHolder'>
                <h2>Category List</h2>
              </div>
              {/* step 2 and step 3 */}
              <LocalSearch keyword={keyword} setKeyword={setKeyword} />

              {/* step 5 */}
              {categories.filter(searched(keyword)).map((c) => (
                <div
                  className='alert alert-primary'
                  style={{ width: 300 }}
                  key={c._id}
                >
                  {c.name}
                  <span
                    onClick={() => handleRemove(c.slug)}
                    className='btn btn-sm float-right'
                  >
                    <DeleteOutlined className='text-danger' />
                  </span>
                  <Link to={`/admin/category/${c.slug}`}>
                    <span className='btn btn-sm float-right'>
                      <EditOutlined className='text-warning' />
                    </span>
                  </Link>
                </div>
              ))}
            </>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default CategoryCreate;
