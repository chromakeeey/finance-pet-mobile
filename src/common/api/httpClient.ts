import axios from 'axios'
import qs from 'qs'
import applyAuthInterceptor from './interceptors/auth'
import applyLoggerInterceptor from './interceptors/logger'

const httpClient = axios.create({
  baseURL: 'https://finance-pet-app.herokuapp.com',
  paramsSerializer: params => qs.stringify(params, { arrayFormat: 'repeat' }),
})

applyLoggerInterceptor(httpClient)
applyAuthInterceptor(httpClient)

export default httpClient
