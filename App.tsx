import { Provider } from '@ant-design/react-native'
import { QueryClientProvider } from '@api/queryClient'
import { CheckDateProvider } from '@hooks/useCheckDate'
import '@i18n'
import { NavigationContainer } from '@react-navigation/native'
import RootRouter from '@screens/index'
import tw from '@tools/tailwind'
import { useTranslation } from 'react-i18next'
import { StatusBar } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { useDeviceContext } from 'twrnc'

const App = () => {
  useDeviceContext(tw)

  const { t } = useTranslation()

  return (
    <CheckDateProvider>
      <Provider>
        <SafeAreaProvider>
          <QueryClientProvider>
            <NavigationContainer>
              <RootRouter />
              <StatusBar barStyle="light-content" />
            </NavigationContainer>
          </QueryClientProvider>
        </SafeAreaProvider>
      </Provider>
    </CheckDateProvider>
  )
}

export default App
