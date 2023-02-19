import { DocsSVG } from '@assets/icons'
import '@i18n'
import tw from '@tools/tailwind'
import { useTranslation } from 'react-i18next'
import { Text, View } from 'react-native'
import Config from 'react-native-config'
import { useDeviceContext } from 'twrnc'

const App = () => {
  useDeviceContext(tw)

  const { t } = useTranslation()

  return (
    <View style={tw`flex-1 justify-center items-center`}>
      <Text style={tw`text-lg`}>Hi, let's check if everything works</Text>
      <Text style={tw`text-lg`}>i18n: {t('screens.home.title')}</Text>
      <Text>Config: {JSON.stringify(Config, null, 2)}</Text>
      <Text style={tw`text-lg`}>SVG:</Text>
      <DocsSVG />
    </View>
  )
}

export default App
