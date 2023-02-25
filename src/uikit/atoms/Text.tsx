import tw from '@tools/tailwind'
import { FC } from 'react'
import { Text as RNText, TextProps } from 'react-native'
import { ClassInput } from 'twrnc/dist/esm/types'

const Text: FC<TextProps> = ({ children, style }) => {
  return <RNText style={tw.style(style as ClassInput)}>{children}</RNText>
}

export default Text
