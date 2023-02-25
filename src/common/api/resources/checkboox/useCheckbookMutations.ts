import queryClient from '@api/queryClient'
import { useMutation } from '@tanstack/react-query'
import checkbookApi from './actions'
import { checkbooxKeys } from './constants'

const useCheckbookMutations = () => {
  const createCheck = useMutation(checkbookApi.createCheck, {
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries(
        checkbooxKeys.root(variables.month, variables.year),
      )
    },
  })

  const createIncome = useMutation(checkbookApi.createIncome, {
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries(
        checkbooxKeys.root(variables.month, variables.year),
      )
    },
  })

  return { createCheck, createIncome }
}

export default useCheckbookMutations
