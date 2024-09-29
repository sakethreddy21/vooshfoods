

import axios from 'axios'
const BASE_URL = process.env.STRICKS_SERVER_BASE_URL
export const AUTH_INIT_API = '/v1/api/auth/init'
export const AUTH_VERIFY_API = '/v1/api/auth/verify'
export const USER_BASE_API = '/v2/api/user'

export const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        Authorization: '74da9DABOqgoipxqQDdygw',
        'Content-Type': 'application/json',
    },
})

export const fetchGet = (url: string) =>
    api.get(url).then((res) => res.data.data)

export const fetchPost = (url: string, body: any) =>
    api.post(url, body).then((res) => res.data.data)
