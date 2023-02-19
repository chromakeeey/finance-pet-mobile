import httpClient from '@api/httpClient'
import type { DumbModel } from '@models/company'
import { companyUrls } from './constants'

const getCompany = async () => {
  const { data } = await httpClient.get<DumbModel>(companyUrls.root(''))
  return data
}

export default {
  getCompany,
}
