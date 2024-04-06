import axios from 'axios'
import { API_URL } from '../constants/index'
import { getAuthInstance } from '../utils/storage'

export const apiGetProfile = async (token) => {

    const response = await getAuthInstance(token).get('/users/get/profile')

    return response

}

export const apiVerifyOtp = async (email) => {

    const response = await axios.post(`${API_URL}/users/verify`, {
        email
    })

    return response
}

export const apiActiveUser = async (email) => {

    const response = await axios.post(`${API_URL}/users/active`, {
        email
    })

    return response
}

export const apiUpdateUser = async (formData, id, token) => {

    const response = await getAuthInstance(token).put(`/users/update/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    })

    return response
}

export const apiUpdateEmail = async (email, token) => {

    const response = await getAuthInstance(token).put('/users/email', {
        email
    })

    return response
}
