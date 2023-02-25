import tw from '@tools/tailwind'
import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native'
import { ClassInput } from 'twrnc/dist/esm/types'

export interface ButtonProps extends TouchableOpacityProps {
  title: string
}

const Button = ({ title, style, disabled, ...props }: ButtonProps) => {
  return (
    <TouchableOpacity
      {...props}
      disabled={disabled}
      style={tw.style(
        `bg-azure py-3 px-2 rounded-xl`,
        disabled && 'opacity-50',
        style as ClassInput,
      )}
    >
      <Text style={tw`text-center text-white font-gilroy-medium text-lg`}>
        {title}
      </Text>
    </TouchableOpacity>
  )
}

export default Button
