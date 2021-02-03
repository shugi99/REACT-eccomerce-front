import React, { lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

import { LoadingOutlined } from '@ant-design/icons';
import ResetPassword from './pages/auth/ResetPassword';

const ContactForm = lazy(() => import('./components/contanctForm/ContactForm'));

const Login = lazy(() => import('./pages/auth/Login'));
const Register = lazy(() => import('./pages/auth/Register'));
const Home = lazy(() => import('./pages/Home'));
const Header = lazy(() => import('./components/nav/Header'));
const SideDrawer = lazy(() => import('./components/drawer/SideDrawer'));

// const ForgotPassword = lazy(() => import('./pages/auth/ForgotPassword'));
const History = lazy(() => import('./pages/user/History'));
const UserRoute = lazy(() => import('./components/routes/UserRoute'));
const AdminRoute = lazy(() => import('./components/routes/AdminRoute'));
const Password = lazy(() => import('./pages/user/Password'));
const Wishlist = lazy(() => import('./pages/user/Wishlist'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const CategoryCreate = lazy(() =>
  import('./pages/admin/category/CategoryCreate')
);
const CategoryUpdate = lazy(() =>
  import('./pages/admin/category/CategoryUpdate')
);
const SubCreate = lazy(() => import('./pages/admin/sub/SubCreate'));
const SubUpdate = lazy(() => import('./pages/admin/sub/SubUpdate'));
const ProductCreate = lazy(() => import('./pages/admin/product/ProductCreate'));
const AllProducts = lazy(() => import('./pages/admin/product/AllProducts'));
const ProductUpdate = lazy(() => import('./pages/admin/product/ProductUpdate'));
const Product = lazy(() => import('./pages/Product'));
const CategoryHome = lazy(() => import('./pages/category/CategoryHome'));
const SubHome = lazy(() => import('./pages/sub/SubHome'));
const Shop = lazy(() => import('./pages/Shop'));
const Cart = lazy(() => import('./pages/Cart'));
const Checkout = lazy(() => import('./pages/Checkout'));
const CreateCouponPage = lazy(() =>
  import('./pages/admin/coupon/CreateCouponPage')
);
const Payment = lazy(() => import('./pages/Payment'));
const ForgotPassword = lazy(() => import('./pages/auth/ForgotPassword'));

const App = () => {
  return (
    <Suspense
      fallback={
        <div className='col text-center p-5'>
          __ React Redux EC
          <LoadingOutlined />
          MMERCE __
        </div>
      }
    >
      <Header />
      <SideDrawer />
      <ToastContainer />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/register' component={Register} />
        <Route exact path='/forgot-password' component={ForgotPassword} />
        <Route
          exact
          path='/reset-password/:resetPasswordToken'
          component={ResetPassword}
        />

        {/* <Route exact path='/forgot/password' component={ForgotPassword} /> */}
        <UserRoute exact path='/user/history' component={History} />
        <UserRoute exact path='/user/profile' component={Password} />
        <UserRoute exact path='/user/wishlist' component={Wishlist} />
        <AdminRoute exact path='/admin/dashboard' component={AdminDashboard} />
        <AdminRoute exact path='/admin/category' component={CategoryCreate} />
        <AdminRoute
          exact
          path='/admin/category/:slug'
          component={CategoryUpdate}
        />
        <AdminRoute exact path='/admin/sub' component={SubCreate} />
        <AdminRoute exact path='/admin/sub/:slug' component={SubUpdate} />
        <AdminRoute exact path='/admin/product' component={ProductCreate} />
        <AdminRoute exact path='/admin/products' component={AllProducts} />
        <AdminRoute
          exact
          path='/admin/product/:slug'
          component={ProductUpdate}
        />
        <Route exact path='/product/:slug' component={Product} />
        <Route exact path='/category/:slug' component={CategoryHome} />
        <Route exact path='/sub/:slug' component={SubHome} />
        <Route exact path='/shop' component={Shop} />
        <Route exact path='/cart' component={Cart} />
        <Route exact path='/contact' component={ContactForm} />
        <UserRoute exact path='/checkout' component={Checkout} />
        <AdminRoute exact path='/admin/coupon' component={CreateCouponPage} />
        <UserRoute exact path='/payment' component={Payment} />
      </Switch>
    </Suspense>
  );
};

export default App;
