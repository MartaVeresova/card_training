import axios from 'axios';

const instance = axios.create({
    baseURL: `https://neko-back.herokuapp.com/2.0`,
    // withCredentials: true,
})

//api
export const registerApi = {
    register(email: string, password: string) {
        return instance.post<RegisterResponseType>(`/auth/register`, {email, password})
    },
}

export type RegisterResponseType = {
    error?: string
}