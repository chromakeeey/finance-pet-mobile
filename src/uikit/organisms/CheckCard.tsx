import type { CheckCategory } from '@models/checkbook'
import tw from '@tools/tailwind'
import { Text, View } from 'react-native'

export interface CheckCardProps extends CheckCategory {}

const CheckCard = ({
  category_emoji,
  category_name,
  amount,
}: CheckCardProps) => {
  return (
    <View style={tw`flex-row items-center bg-darkblue px-4 py-4 mb-2`}>
      <Text style={tw`text-3xl mr-4`}>{category_emoji}</Text>

      <View style={tw`flex-1`}>
        <Text style={tw`text-white font-gilroy-bold text-xl`}>
          {category_name}
        </Text>
      </View>

      <Text style={tw`text-red font-gilroy-bold`}>- {amount.toFixed(2)} ₴</Text>
    </View>
  )
}

export default CheckCard
