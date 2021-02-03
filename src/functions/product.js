import axios from 'axios';

export const createProduct = async (product, userInfo) =>
  await axios.post(`${process.env.REACT_APP_API}/product`, product, {
    headers: {
      Authorization: `Bearer ${userInfo}`,
    },
  });

export const getProductsByCount = async (count) =>
  await axios.get(`${process.env.REACT_APP_API}/products/${count}`);

export const removeProduct = async (slug, userInfo) =>
  await axios.delete(`${process.env.REACT_APP_API}/product/${slug}`, {
    headers: {
      Authorization: `Bearer ${userInfo}`,
    },
  });

export const getProduct = async (slug) =>
  await axios.get(`${process.env.REACT_APP_API}/product/${slug}`);

export const updateProduct = async (slug, product, userInfo) =>
  await axios.put(`${process.env.REACT_APP_API}/product/${slug}`, product, {
    headers: {
      Authorization: `Bearer ${userInfo}`,
    },
  });

export const getProducts = async (sort, order, page) =>
  await axios.post(`${process.env.REACT_APP_API}/products`, {
    sort,
    order,
    page,
  });

export const getProductsCount = async () =>
  await axios.get(`${process.env.REACT_APP_API}/products/total`);

export const productStar = async (productId, star, userInfo) =>
  await axios.put(
    `${process.env.REACT_APP_API}/product/star/${productId}`,
    { star },
    {
      headers: {
        Authorization: `Bearer ${userInfo}`,
      },
    }
  );

export const getRelated = async (productId) =>
  await axios.get(`${process.env.REACT_APP_API}/product/related/${productId}`);

export const fetchProductsByFilter = async (arg) =>
  await axios.post(`${process.env.REACT_APP_API}/search/filters`, arg);
