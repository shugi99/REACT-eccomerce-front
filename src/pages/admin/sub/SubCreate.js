import React, { useState, useEffect } from 'react';
import AdminNav from '../../../components/nav/AdminNav';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { getCategories } from '../../../functions/category';
import { createSub, removeSub, getSubs } from '../../../functions/sub';
import { Link } from 'react-router-dom';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import CategoryForm from '../../../components/forms/CategoryForm';
import LocalSearch from '../../../components/forms/LocalSearch';
import { Button, Col, Form, Input, Row, Select } from 'antd';
import Loader from '../../../components/loader/Loader';
import AdminNavResponsive from '../../../components/nav/AdminNavResponsive';
const { Option } = Select;

const SubCreate = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState('');
  const [subs, setSubs] = useState([]);
  const [callback, setCallback] = useState(false);
  // step 1
  const [keyword, setKeyword] = useState('');
  const [visible, setVisible] = useState(false);

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

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const categoryChange = (e) => {
    console.log(e);
    setCategory(e);
  };

  useEffect(() => {
    const loadCategories = () =>
      getCategories().then((c) => setCategories(c.data));
    const loadSubs = () => getSubs().then((s) => setSubs(s.data));
    loadCategories();
    loadSubs();
  }, [callback]);

  const handleSubmit = (e) => {
    console.log('new', e);
    setLoading(true);
    createSub({ name: e.name, parent: e.category }, userInfo.token)
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
      removeSub(slug, userInfo.token)
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
                  <h2>Sub Category Create</h2>
                </div>
              </div>

              <Col
                xs={{ span: 24 }}
                sm={{ span: 24 }}
                md={{ offset: 2, span: 18 }}
              >
                <Form onFinish={handleSubmit} {...layout}>
                  <Form.Item
                    name='category'
                    label='Category'
                    rules={[
                      {
                        required: true,
                        message: 'Please input  Category.',
                      },
                    ]}
                  >
                    <Select
                      placeholder='Select a category'
                      onChange={categoryChange}
                    >
                      {categories.length > 0 &&
                        categories.map((c) => (
                          <Option key={c._id} value={c._id}>
                            {c.name}
                          </Option>
                        ))}
                    </Select>
                  </Form.Item>

                  <Form.Item
                    label='Name'
                    name='name'
                    rules={[
                      {
                        required: true,
                        message: 'Please input your subcategory.',
                      },
                    ]}
                  >
                    <Input placeholder='Input Name' />
                  </Form.Item>

                  <Form.Item {...tailLayout}>
                    <Button type='primary' htmlType='submit'>
                      Submit
                    </Button>
                  </Form.Item>
                </Form>

                <div className='titleHolder'>
                  <h2>Sub Category List</h2>
                </div>

                <LocalSearch keyword={keyword} setKeyword={setKeyword} />

                {subs.filter(searched(keyword)).map((s) => (
                  <div className='alert alert-secondary' key={s._id}>
                    {s.name}
                    <span
                      onClick={() => handleRemove(s.slug)}
                      className='btn btn-sm float-right'
                    >
                      <DeleteOutlined className='text-danger' />
                    </span>
                    <Link to={`/admin/sub/${s.slug}`}>
                      <span className='btn btn-sm float-right'>
                        <EditOutlined className='text-warning' />
                      </span>
                    </Link>
                  </div>
                ))}
              </Col>
            </>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default SubCreate;
