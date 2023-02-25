import { useUser } from '@api'
import { Checkbook } from '@models/checkbook'
import { useQuery } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import userApi from './actions'
import { checkbooxKeys } from './constants'

export interface UseCheckbookProps {
  month: number
  year: number
}

const useCheckbook = ({ month, year }: UseCheckbookProps) => {
  const userQuery = useUser()

  const query = useQuery<Checkbook, AxiosError>(
    checkbooxKeys.root(month, year),
    () => userApi.getCheckbook(month, year),
    {
      enabled: userQuery.isSuccess && !!userQuery.data,
    },
  )

  return query
}

export default useCheckbook
