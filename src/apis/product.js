import axios from 'axios'
import { API_URL } from '../constants/index'

export const apiSearchProduct = async (keyword) => {

    const response = await axios.get(`${API_URL}/products?title=${keyword}&num=10`)

    return response
}