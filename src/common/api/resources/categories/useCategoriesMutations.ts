import queryClient from '@api/queryClient'
import { useMutation } from '@tanstack/react-query'
import categoriesApi from './actions'
import { categoriesKeys } from './constants'

const useCategoriesMutations = () => {
  const createCategory = useMutation(categoriesApi.createCategory, {
    onSuccess: () => {
      queryClient.invalidateQueries(categoriesKeys.root)
    },
  })

  return { createCategory }
}

export default useCategoriesMutations
