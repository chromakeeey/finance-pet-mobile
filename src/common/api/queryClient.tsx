import httpClient from '@api/httpClient'
import { useFocusEffect } from '@react-navigation/native'
import {
  focusManager,
  QueryClient,
  QueryClientProvider as BaseQueryClientProvider,
  QueryFunction
} from '@tanstack/react-query'
import { AxiosError } from 'axios'
import ms from 'ms'
import type { FC } from 'react'
import { useCallback, useEffect, useRef } from 'react'
import { Alert, AppState, AppStateStatus, Platform } from 'react-native'

const defaultQueryFunction: QueryFunction = async ({ queryKey }) =>
  httpClient.get(queryKey.join('/')).then(resp => resp.data)

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: defaultQueryFunction,
      cacheTime: ms('1d'),
      refetchOnMount: true,
      refetchOnReconnect: true,
      refetchOnWindowFocus: true,
      retry: false,
    },
    mutations: {
      onError: error => {
        console.log('Error', error)

        if (error instanceof AxiosError) {
          console.log('instance of Axios')
          Alert.alert('Error', error.response?.data?.error || 'Unknown error')
        }
      },
    },
  },
})

export const QueryClientProvider: FC<{ children: any }> = ({ children }) => (
  <BaseQueryClientProvider client={queryClient}>
    {children}
  </BaseQueryClientProvider>
)

export default queryClient

const onAppStateChange = (status: AppStateStatus) => {
  if (Platform.OS !== 'web') {
    focusManager.setFocused(status === 'active')
  }
}

export const useRefetchOnAppFocus = () => {
  useEffect(() => {
    const listener = AppState.addEventListener('change', onAppStateChange)
    return listener.remove
  }, [])
}

export const useRefreshOnScreenFocus = <T,>(refetch: () => Promise<T>) => {
  const firstTimeRef = useRef(true)

  useFocusEffect(
    useCallback(() => {
      if (firstTimeRef.current) {
        firstTimeRef.current = false
        return
      }

      refetch()
    }, [refetch]),
  )
}
