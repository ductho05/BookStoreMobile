import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {API_URL} from '../constants/index';
export const getData = async key => {
  let data = await AsyncStorage.getItem(key);

  data = JSON.parse(data);

  return data;
};

export const setData = (key, value) => {
  AsyncStorage.setItem(key, JSON.stringify(value));
};

export const getAuthInstance = token => {
//   console.log('user', token);
  return axios.create({
    baseURL: API_URL,
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
};
