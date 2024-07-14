import axios from 'axios';
import { API_URL } from '../constants/index';
import { useSelector } from 'react-redux';
import { getAuthInstance } from '../utils/storage';
// const authInstance = getAuthInstance();
export const apiGetProductHots = async path => {
  const response = await axios.get(`${API_URL}/products${path}`);
  //  console.log('response21', response);
  return response;
};

export const apiDeleteFavorites = async (token, userid, productid) => {
  try {
    // console.log('token', token, userid, productid);
    const response = await getAuthInstance(token).post('/favorites/delete', {
      userid: userid,
      productid: productid,
    });
    //  console.log('response21', response.data);
    return response;
  } catch (error) {
    console.error('Error fetching favorites:', error);
    throw error;
  }
};

export const apiGetFavoritesForMe = async token => {
  // const {user} = useSelector(state => state.user);
  const last24Chars = token.slice(-24);
  const firstPart = token.slice(0, -24);
  try {
    const response = await getAuthInstance(firstPart).get(
      `/favorites?userid=${last24Chars}`,
    );
    return response;
  } catch (error) {
    console.error('Error fetching favorites:', error);
    throw error;
  }
};

export const apiGetVouchersForMe = async token => {
  // const {user} = useSelector(state => state.user);
  const last24Chars = token.slice(-24);
  const firstPart = token.slice(0, -24);
  //console.log('21e22s', last24Chars, '+++', firstPart);
  try {
    const response = await getAuthInstance(firstPart).get(
      `/vouchers?user=${last24Chars}`,
    );
    //console.log('response21', response.data.data);
    return response;
  } catch (error) {
    console.error('Error fetching favorites:', error);
    throw error;
  }
};

export const apiGetStatusOrderForMe = async token => {
  // const {user} = useSelector(state => state.user);
  // console.log('test02', token);
  // 2 kí tự
  const page = token.slice(0, 1) == '0' ? token.slice(1, 2) : token.slice(0, 2);
  // 1 kí tự
  const path = token.slice(2, 3);
  // phần giữa
  const tok = token.slice(3, -24);
  // 24 kí tự
  const user = token.slice(-24);
  try {
    const response = await getAuthInstance(tok).post(
      `/orders/filter?status=${path == '0'
        ? 'CHOXACNHAN'
        : path == '1'
          ? 'DANGGIAO'
          : path == '2'
            ? 'HOANTHANH'
            : 'DAHUY'
      }&user=${user}&page=${page}&limit=10`,
    );
    // console.log('response221', response.data.data);
    return response;
  } catch (error) {
    console.error('Error fetching favorites:', error);
    throw error;
  }
};

export const apiGetAllOrderForMe = async token => {
  // const {user} = useSelector(state => state.user);
  const last24Chars = token.slice(-24);
  const midPart = token.slice(2, -24);
  const firstPart =
    token.slice(0, 1) == '0' ? token.slice(1, 2) : token.slice(0, 2);
  // console.log('21e22s', last24Chars, '+++', midPart);
  try {
    const response = await getAuthInstance(midPart).post(
      `/orders/filter?user=${last24Chars}&page=${firstPart}&limit=10`,
    );
    // console.log('response21', response.data.data);
    return response;
  } catch (error) {
    console.error('Error fetching favorites:', error);
    throw error;
  }
};

export const apiGetProductCategory = async path => {
  const response = await axios.post(`${API_URL}/products/category?${path}`);

  return response;
};

export const apiGetSlideList = async () => {
  const response = await axios.get(`${API_URL}/products/bestseller-limit`);

  return response;
};

export const apiAddFavorite = async (token, data) => {

  try {
    const response = await getAuthInstance(token).post(`/favorites/add`, data);

    return response;
  } catch (error) {
    console.error('Error add favorites:', error);
    throw error;
  }
}

export const apiGetAllCategory = async () => {

  const response = await axios.get(`${API_URL}/categories`)

  return response
}

export const apiGetNotification = async (token, id) => {
  try {
    const response = await getAuthInstance(token).post('/webpush/get', { id })

    return response
  } catch (error) {
    console.error('Error get notification', error);
    throw error;
  }
}
