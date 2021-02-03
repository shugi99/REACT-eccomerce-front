import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getSubs } from '../../functions/sub';
import { Tag } from 'antd';

const SubList = () => {
  const [subs, setSubs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getSubs().then((res) => {
      setSubs(res.data);
      setLoading(false);
    });
  }, []);

  const showSubs = () =>
    subs.map((s) => (
      <Link to={`/category/${s.slug}`}>
        <Tag color='#2db7f5' key={s._id} style={{ textAlign: 'center' }}>
          {s.name}
        </Tag>
      </Link>
    ));

  return (
    <div className='block2 featureBlock'>
      <div className='container-fluid'>
        <div className='categoryHolder'>
          <h2>Sub Categories</h2>
        </div>
        {loading ? (
          <h4 className='text-center'>Loading...</h4>
        ) : (
          <div className='categoryList'>{showSubs()}</div>
        )}
      </div>
    </div>
  );
};

export default SubList;
