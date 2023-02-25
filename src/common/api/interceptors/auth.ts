import { userApi } from '@api'
import type { AxiosInstance } from 'axios'

export default (axiosClient: AxiosInstance) => {
  axiosClient.interceptors.request.use(async config => {
    const token = await userApi.getToken()

    if (token) {
      config.headers!['Authorization'] = `Bearer ${token}`
    }

    return config
  })
}
