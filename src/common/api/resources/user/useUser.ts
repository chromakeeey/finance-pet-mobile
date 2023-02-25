import { User } from '@models/user'
import { useQuery } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import userApi from './actions'
import { userKeys } from './constants'

const useUser = () => {
  const query = useQuery<User | null, AxiosError>(
    userKeys.root,
    userApi.getUser,
  )

  return { ...query, data: query.data ?? null }
}

export default useUser
