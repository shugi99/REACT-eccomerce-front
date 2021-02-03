import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  userLoginReducer,
  userRegisterReducer,
  // userDetailsReducer,
  // userUpdateProfileReducer,
  // userListReducer,
  // userUpdateReducer,
  // forgotPasswordReducer,
} from './reducers/userReducer';
import { CODReducer } from './reducers/CODReducer';
import { couponReducer } from './reducers/couponReducer';
import { drawerReducer } from './reducers/drawerReducer';
import { cartReducer } from './reducers/cartReducer';
import { searchReducer } from './reducers/searchReducer';

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  search: searchReducer,
  cart: cartReducer,
  drawer: drawerReducer,
  coupon: couponReducer,
  COD: CODReducer,
});

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
