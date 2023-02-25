import httpClient from '@api/httpClient'
import { Checkbook } from '@models/checkbook'
import { checkbooxUrls } from './constants'

export interface CreateCheckBody {
  category_id: string
  amount: number
  description?: string
  year: number
  month: number
}

export interface CreateIncomeBody {
  amount: number
  year: number
  month: number
}

const getCheckbook = async (month: number, year: number) => {
  const { data } = await httpClient.get<Checkbook>(checkbooxUrls.root, {
    params: {
      month,
      year,
    },
  })
  return data
}

const createCheck = async ({
  category_id,
  amount,
  description,
  year,
  month,
}: CreateCheckBody) => {
  const { data } = await httpClient.post(checkbooxUrls.root, {
    category_id,
    amount,
    description,
    year,
    month,
  })

  return data
}

const createIncome = async ({ amount, year, month }: CreateIncomeBody) => {
  const { data } = await httpClient.post(checkbooxUrls.income, {
    amount,
    year,
    month,
  })

  return data
}

export default {
  getCheckbook,
  createCheck,
  createIncome,
}
