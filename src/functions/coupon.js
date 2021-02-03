import axios from 'axios';

export const getCoupons = async () =>
  await axios.get(`${process.env.REACT_APP_API}/coupons`);

export const removeCoupon = async (couponId, userInfo) =>
  await axios.delete(`${process.env.REACT_APP_API}/coupon/${couponId}`, {
    headers: {
      Authorization: `Bearer ${userInfo}`,
    },
  });

export const createCoupon = async (coupon, userInfo) =>
  await axios.post(
    `${process.env.REACT_APP_API}/coupon`,
    { coupon },
    {
      headers: {
        Authorization: `Bearer ${userInfo}`,
      },
    }
  );
