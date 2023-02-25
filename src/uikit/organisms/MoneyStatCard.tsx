import tw from '@tools/tailwind'
import { Text, View } from 'react-native'
import { ClassInput } from 'twrnc/dist/esm/types'

export interface MoneyStatCardProps {
  value: number
  description: string
  emoji: string
  style?: ClassInput
}

const MoneyStatCard = ({
  value,
  description,
  emoji,
  style,
}: MoneyStatCardProps) => {
  return (
    <View
      style={tw.style(`p-2 rounded-2xl border-[1px] border-darkblue`, style)}
    >
      <Text style={tw`text-5xl`}>{emoji}</Text>
      <Text style={tw`text-2xl font-bold`}>{value} ₴</Text>
      <Text>{description}</Text>
    </View>
  )
}

export default MoneyStatCard
