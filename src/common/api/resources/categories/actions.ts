import httpClient from '@api/httpClient'
import { Category } from '@models/category'
import { categoriesUrls } from './constants'

export interface CreateCategoryBody {
  name: string
  emoji: string
}

const getCategories = async () => {
  const { data } = await httpClient.get<Category[]>(categoriesUrls.root)

  return data
}

const createCategory = async ({ name, emoji }: CreateCategoryBody) => {
  const { data } = await httpClient.post(categoriesUrls.root, {
    name,
    emoji,
  })

  return data
}

export default {
  getCategories,
  createCategory,
}
