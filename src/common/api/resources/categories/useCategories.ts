import { Category } from '@models/category'
import { useQuery } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import categoryApi from './actions'
import { categoriesKeys } from './constants'

const useCategories = () => {
  const query = useQuery<Category[], AxiosError>(
    categoriesKeys.root,
    categoryApi.getCategories,
  )

  return query
}

export default useCategories
