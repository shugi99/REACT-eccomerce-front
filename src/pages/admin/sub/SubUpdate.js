import React, { useState, useEffect } from 'react';
import AdminNav from '../../../components/nav/AdminNav';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { getCategories } from '../../../functions/category';
import { updateSub, getSub } from '../../../functions/sub';

import CategoryForm from '../../../components/forms/CategoryForm';
import { Col, Row } from 'antd';
import AdminNavResponsive from '../../../components/nav/AdminNavResponsive';
import Loader from '../../../components/loader/Loader';

const SubUpdate = ({ match, history }) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [parent, setParent] = useState('');

  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  useEffect(() => {
    const loadCategories = () =>
      getCategories().then((c) => setCategories(c.data));
    const loadSub = () =>
      getSub(match.params.slug).then((s) => {
        setName(s.data.name);
        setParent(s.data.parent);
      });
    loadCategories();
    loadSub();
  }, [match.params.slug]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(name);
    setLoading(true);
    updateSub(match.params.slug, { name, parent }, userInfo.token)
      .then((res) => {
        // console.log(res)
        setLoading(false);
        setName('');
        toast.success(`"${res.data.name}" is updated`);
        history.push('/admin/sub');
      })
      .catch((err) => {
        console.log(err);
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
                <h2>Sub Category Update</h2>
              </div>
            </div>
          )}

          <div className='form-group'>
            <label>Parent category</label>
            <select
              name='category'
              className='form-control'
              onChange={(e) => setParent(e.target.value)}
            >
              <option>Please select</option>
              {categories.length > 0 &&
                categories.map((c) => (
                  <option key={c._id} value={c._id} selected={c._id === parent}>
                    {c.name}
                  </option>
                ))}
            </select>
          </div>

          <CategoryForm
            handleSubmit={handleSubmit}
            name={name}
            setName={setName}
          />
        </Col>
      </Row>
    </div>
  );
};

export default SubUpdate;
