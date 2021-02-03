import axios from 'axios';
import {
  // USER_DETAILS_FAIL,
  // USER_DETAILS_REQUEST,
  // USER_DETAILS_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  // USER_UPDATE_PROFILE_FAIL,
  // USER_UPDATE_PROFILE_REQUEST,
  // USER_UPDATE_PROFILE_SUCCESS,
  USER_DETAILS_RESET,
  // USER_LIST_REQUEST,
  // USER_LIST_SUCCESS,
  // USER_LIST_FAIL,
  USER_LIST_RESET,
  // USER_DELETE_REQUEST,
  // USER_DELETE_SUCCESS,
  // USER_DELETE_FAIL,
  // USER_UPDATE_REQUEST,
  // USER_UPDATE_SUCCESS,
  // USER_UPDATE_FAIL,
} from '../constants/userConstants';

// export const createOrUpdateUser = async (userInfo) => {
//   return await axios.post(
//     `${process.env.REACT_APP_API}/create-or-update-user`,
//     {},
//     {
//       headers: {
//         Authorization: `Bearer ${userInfo}`,
//       },
//     }
//   );
// };

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axios.post(
      `${process.env.REACT_APP_API}/login`,
      { email, password },
      config
    );
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });
    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const logout = () => (dispatch) => {
  localStorage.removeItem('userInfo');
  dispatch({ type: USER_LOGOUT });
  dispatch({ type: USER_DETAILS_RESET });

  dispatch({ type: USER_LIST_RESET });
};

export const register = (name, email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST,
    });
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axios.post(
      `${process.env.REACT_APP_API}/register`,
      { name, email, password },
      config
    );
    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data,
    });
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });
    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const currentUser = async (userInfo) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/current-user`,
    {},
    {
      headers: {
        Authorization: `Bearer ${userInfo}`,
      },
    }
  );
};

export const updateUser = async (e, userInfo) =>
  await axios.put(`${process.env.REACT_APP_API}/profile`, e, {
    headers: {
      Authorization: `Bearer ${userInfo}`,
    },
  });

export const currentAdmin = async (userInfo) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/current-admin`,
    {},
    {
      headers: {
        Authorization: `Bearer ${userInfo}`,
      },
    }
  );
};

export const forgotPassword = (email) => {
  console.log('email: ', email);
  return fetch(`${process.env.REACT_APP_API}/forgot-password/`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  })
    .then((response) => {
      console.log('forgot password response: ', response);
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const resetPassword = (resetInfo) => {
  return fetch(`${process.env.REACT_APP_API}/reset-password/`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(resetInfo),
  })
    .then((response) => {
      console.log('forgot password response: ', response);
      return response.json();
    })
    .catch((err) => console.log(err));
};
