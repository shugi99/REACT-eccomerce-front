import axios from 'axios';

export const userCart = async (cart, userInfo) =>
  await axios.post(
    `${process.env.REACT_APP_API}/user/cart`,
    { cart },
    {
      headers: {
        Authorization: `Bearer ${userInfo}`,
      },
    }
  );

export const getUserCart = async (userInfo) =>
  await axios.get(`${process.env.REACT_APP_API}/user/cart`, {
    headers: {
      Authorization: `Bearer ${userInfo}`,
    },
  });

export const emptyUserCart = async (userInfo) =>
  await axios.delete(`${process.env.REACT_APP_API}/user/cart`, {
    headers: {
      Authorization: `Bearer ${userInfo}`,
    },
  });

export const saveUserAddress = async (userInfo, address) =>
  await axios.post(
    `${process.env.REACT_APP_API}/user/address`,
    { address },
    {
      headers: {
        Authorization: `Bearer ${userInfo}`,
      },
    }
  );

export const applyCoupon = async (userInfo, coupon) =>
  await axios.post(
    `${process.env.REACT_APP_API}/user/cart/coupon`,
    { coupon },
    {
      headers: {
        Authorization: `Bearer ${userInfo}`,
      },
    }
  );

export const createOrder = async (stripeResponse, userInfo) =>
  await axios.post(
    `${process.env.REACT_APP_API}/user/order`,
    { stripeResponse },
    {
      headers: {
        Authorization: `Bearer ${userInfo}`,
      },
    }
  );

export const getUserOrders = async (userInfo) =>
  await axios.get(`${process.env.REACT_APP_API}/user/orders`, {
    headers: {
      Authorization: `Bearer ${userInfo}`,
    },
  });

export const getWishlist = async (userInfo) =>
  await axios.get(`${process.env.REACT_APP_API}/user/wishlist`, {
    headers: {
      Authorization: `Bearer ${userInfo}`,
    },
  });

export const removeWishlist = async (productId, userInfo) =>
  await axios.put(
    `${process.env.REACT_APP_API}/user/wishlist/${productId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${userInfo}`,
      },
    }
  );

export const addToWishlist = async (productId, userInfo) =>
  await axios.post(
    `${process.env.REACT_APP_API}/user/wishlist`,
    { productId },
    {
      headers: {
        Authorization: `Bearer ${userInfo}`,
      },
    }
  );

export const createCashOrderForUser = async (
  userInfo,
  COD,
  couponTrueOrFalse
) =>
  await axios.post(
    `${process.env.REACT_APP_API}/user/cash-order`,
    { couponApplied: couponTrueOrFalse, COD },
    {
      headers: {
        Authorization: `Bearer ${userInfo}`,
      },
    }
  );
