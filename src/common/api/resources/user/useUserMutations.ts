import queryClient from '@api/queryClient'
import { useMutation } from '@tanstack/react-query'
import userApi from './actions'
import { userKeys } from './constants'

const useUserMutations = () => {
  const signUp = useMutation(userApi.signUp, {
    onSuccess: async token => {
      await userApi.saveToken(token)
      await queryClient.refetchQueries(userKeys.root)
    },
  })

  const login = useMutation(userApi.login, {
    onSuccess: async token => {
      await userApi.saveToken(token)
      await queryClient.refetchQueries(userKeys.root)
    },
  })

  const logout = useMutation(userApi.deleteToken, {
    onSuccess: async () => {
      queryClient.invalidateQueries(userKeys.root)
    },
  })

  return {
    signUp,
    login,
    logout,
  }
}

export default useUserMutations
