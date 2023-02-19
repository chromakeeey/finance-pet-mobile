import axios from 'axios'
import qs from 'qs'
import config from 'react-native-config'
import applyLoggerInterceptor from './interceptors/logger'

const httpClient = axios.create({
  baseURL: config.API_URL,
  paramsSerializer: params => qs.stringify(params, { arrayFormat: 'repeat' }),
})

applyLoggerInterceptor(httpClient)

export default httpClient
