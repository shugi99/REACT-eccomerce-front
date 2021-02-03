import React, { useEffect, useState } from 'react';
import { Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoadingToRedirect from './LoadingToRedirect';

const AdminRoute = ({ children, ...rest }) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const [ok, setOk] = useState(false);

  useEffect(() => {
    if (userInfo && userInfo.token && userInfo.role === 'admin') {
      setOk(true);
      // currentAdmin(user.token)
      //   .then((res) => {
      //     console.log("CURRENT ADMIN RES", res);
      //     setOk(true);
      //   })
      //   .catch((err) => {
      //     console.log("ADMIN ROUTE ERR", err);
      //     setOk(false);
      //   });
    } else {
      setOk(false);
    }
  }, [userInfo]);

  return ok ? <Route {...rest} /> : <LoadingToRedirect />;
};

export default AdminRoute;
