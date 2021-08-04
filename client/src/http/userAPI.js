import {$authHost, $host} from "./index";
import jwt_decode from 'jwt-decode'

export const registration = async (login, password, name, surname, patronimic, leader) => {
    const {data} = await $host.post('api/user/registration', {login, password, name, surname, patronimic, leader})
    localStorage.setItem('jwt', data.jwt)
    return jwt_decode(data.jwt)
}

export const login = async (login, password) => {
    const {data} = await $host.post('api/user/login', {login, password})
    localStorage.setItem('jwt', data.jwt)
    return data
}
export const check = async () => {
    const {data} = await $authHost.get('api/user/auth')
    localStorage.setItem('jwt', data.jwt)
    return jwt_decode(data.jwt)
}