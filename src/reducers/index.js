import { combineReducers } from 'redux';
import { userLoginReducer, userRegisterReducer } from './userReducer';
import { searchReducer } from './searchReducer';
import { cartReducer } from './cartReducer';
import { drawerReducer } from './drawerReducer';
import { couponReducer } from './couponReducer';
import { CODReducer } from './CODReducer';

const rootReducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  search: searchReducer,
  cart: cartReducer,
  drawer: drawerReducer,
  coupon: couponReducer,
  COD: CODReducer,
});

export default rootReducer;
