import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCategories } from '../../functions/category';
import { Tag } from 'antd';

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getCategories().then((c) => {
      setCategories(c.data);
      setLoading(false);
    });
  }, []);

  const showCategories = () =>
    categories.map((c) => (
      <Tag
        color='#2db7f5'
        key={c._id}
        style={{ width: '20em', textAlign: 'center', cursor: 'pointer' }}
      >
        <Link to={`/category/${c.slug}`}>{c.name}</Link>
      </Tag>
    ));

  return (
    <div className='block2 featureBlock'>
      <div className='container-fluid'>
        <div className='categoryHolder'>
          <h2>Categories</h2>
        </div>
        {loading ? (
          <h4 className='text-center'>Loading...</h4>
        ) : (
          <div className='categoryList'>{showCategories()}</div>
        )}
      </div>
    </div>
  );
};

export default CategoryList;
