import axios from 'axios'
import { API_URL } from '../constants/index'

export const apiGetProductHots = async (path) => {

    const response = await axios.get(`${API_URL}/products${path}`)

    return response
}

export const apiGetProductCategory = async (path) => {

    const response = await axios.post(`${API_URL}/products/category?${path}`)

    return response
}

export const apiGetSlideList = async () => {

    const response = await axios.get(`${API_URL}/products/bestseller-limit`)

    return response
}
