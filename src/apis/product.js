import axios from 'axios'
import { API_URL } from '../constants/index'
import { API_RECOMMENDATIONS } from '../constants/index'
import { getAuthInstance } from '../utils/storage'

export const apiSearchProduct = async (keyword) => {

    const response = await axios.get(`${API_URL}/products?title=${keyword}&num=10`)

    return response
}

export const apiGetProduct = async (params) => {

    console.log('params', params)

    const response = await axios.get(`${API_URL}/products`, {
        params
    })

    return response
}

export const apiGetProductById = async (id) => {

    const response = await axios.get(`${API_URL}/products/id/${id}`)

    return response
}

export const apiGetProductRate = async (id) => {

    const response = await axios.post(`${API_URL}/evaluates/count?_id=${id}`)

    return response
}

export const apiGetProductComment = async (id) => {

    const response = await axios.post(`${API_URL}/evaluates/product?sort=desc&typeSort=desc&_id=${id}`)

    return response
}

export const apiGetProductByCategory = async (id, limit = 10) => {

    const response = await axios.post(`${API_URL}/products/category?category=${id}&limit=${limit}`)

    return response
}

export const apigetRecommendProduct = async (title, limit = 10) => {
    try {

        const response = await axios.post(`${API_RECOMMENDATIONS}`, {
            title,
            limit
        })
        return response
    } catch (error) {
        return error
    }
}

export const apiEvaluate = async (token, data) => {
    try {

        const response = await getAuthInstance(token).post('/evaluates/insert', data)
        return response
    } catch (error) {
        return error
    }
}

export const apiGetProductFlashSale = async (sort = 'reverse') => {
    try {

        const response = await axios.get(`${API_URL}/flashsales?sort=${sort}&filter=expired`)

        return response
    } catch (error) {
        return error
    }
}
