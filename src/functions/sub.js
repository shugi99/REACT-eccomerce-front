import axios from 'axios';

export const getSubs = async () =>
  await axios.get(`${process.env.REACT_APP_API}/subs`);

export const getSub = async (slug) =>
  await axios.get(`${process.env.REACT_APP_API}/sub/${slug}`);

export const removeSub = async (slug, userInfo) =>
  await axios.delete(`${process.env.REACT_APP_API}/sub/${slug}`, {
    headers: {
      Authorization: `Bearer ${userInfo}`,
    },
  });

export const updateSub = async (slug, sub, userInfo) =>
  await axios.put(`${process.env.REACT_APP_API}/sub/${slug}`, sub, {
    headers: {
      Authorization: `Bearer ${userInfo}`,
    },
  });

export const createSub = async (sub, userInfo) =>
  await axios.post(`${process.env.REACT_APP_API}/sub`, sub, {
    headers: {
      Authorization: `Bearer ${userInfo}`,
    },
  });
