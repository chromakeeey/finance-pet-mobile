import tw from '@tools/tailwind'
import { rgba } from 'polished'
import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native'

export interface CategoryCardProps extends TouchableOpacityProps {
  emoji: string
  name: string
  selected?: boolean
}

const CategoryCard = ({
  emoji,
  name,
  selected,
  onPress,
}: CategoryCardProps) => {
  return (
    <TouchableOpacity
      style={tw.style(
        `items-center p-2 rounded-md mb-3`,
        selected && { backgroundColor: rgba(tw.color('green')!, 0.2) },
        !selected && 'bg-darkblue',
      )}
      onPress={onPress}
    >
      <Text style={tw`text-center text-white font-gilroy-bold text-lg`}>
        {emoji} {'  '}
        {name}
      </Text>
    </TouchableOpacity>
  )
}

export default CategoryCard
