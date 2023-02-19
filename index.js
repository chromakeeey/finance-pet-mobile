import { AppRegistry, Text, TextInput } from 'react-native'
import 'react-native-gesture-handler'
import App from './App'
import { name as appName } from './app.json'

Text.defaultProps = Text.defaultProps || {}
Text.defaultProps.maxFontSizeMultiplier = 1
Text.defaultProps.allowFontScaling = false
TextInput.defaultProps = Text.defaultProps || {}
TextInput.defaultProps.maxFontSizeMultiplier = 1
TextInput.defaultProps.allowFontScaling = false

AppRegistry.registerComponent(appName, () => App)
