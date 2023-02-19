import type { DumbModel } from '@models/company'
import { useQuery } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import companyApi from './actions'
import { companyKeys } from './constants'

const useCompany = () => {
  const query = useQuery<DumbModel, AxiosError>(companyKeys.root(), () =>
    companyApi.getCompany(),
  )

  return query
}

export default useCompany
