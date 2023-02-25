import httpClient from '@api/httpClient'
import { User } from '@models/user'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { userStorageKeys, userUrls } from './constants'

export interface SignUpBody {
  email: string
  password: string
  name: string
}

export interface LoginBody {
  email: string
  password: string
}

const getUser = async () => {
  try {
    const { data } = await httpClient.get<User>(userUrls.root)
    return data
  } catch {
    return null
  }
}

const signUp = async ({ email, password, name }: SignUpBody) => {
  const {
    data: { token },
  } = await httpClient.post<{ token: string }>(userUrls.signup, {
    email,
    password,
    name,
  })

  return token
}

const login = async ({ email, password }: LoginBody) => {
  const {
    data: { token },
  } = await httpClient.post<{ token: string }>(userUrls.login, {
    email,
    password,
  })

  return token
}

const saveToken = (token: string) =>
  AsyncStorage.setItem(userStorageKeys.token, token)

const getToken = () => AsyncStorage.getItem(userStorageKeys.token)

const deleteToken = () => AsyncStorage.removeItem(userStorageKeys.token)

export default {
  getUser,
  signUp,
  saveToken,
  login,
  getToken,
  deleteToken,
}
