import axios from 'axios';

export const createPaymentIntent = (userInfo, coupon) =>
  axios.post(
    `${process.env.REACT_APP_API}/create-payment-intent`,
    { couponApplied: coupon },
    {
      headers: {
        Authorization: `Bearer ${userInfo}`,
      },
    }
  );
