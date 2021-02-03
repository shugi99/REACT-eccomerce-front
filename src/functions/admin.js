import axios from 'axios';

export const getOrders = async (userInfo) =>
  await axios.get(`${process.env.REACT_APP_API}/admin/orders`, {
    headers: {
      Authorization: `Bearer ${userInfo}`,
    },
  });

export const changeStatus = async (orderId, orderStatus, userInfo) =>
  await axios.put(
    `${process.env.REACT_APP_API}/admin/order-status`,
    { orderId, orderStatus },
    {
      headers: {
        Authorization: `Bearer ${userInfo}`,
      },
    }
  );
