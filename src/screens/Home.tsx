import { useCheckbook, useUser, useUserMutations } from '@api'
import useCheckDate from '@hooks/useCheckDate'
import { useNavigation } from '@react-navigation/native'
import { formatMonthToString } from '@tools/date'
import tw from '@tools/tailwind'
import { CheckCard } from '@uikit/organisms'
import { getYear, parse } from 'date-fns'
import { rgba } from 'polished'
import { useState } from 'react'
import {
  Alert,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import MonthPicker from 'react-native-month-year-picker'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { RootStackScreenProps } from '.'

const HomeScreen = () => {
  const userMutations = useUserMutations()

  const user = useUser()

  const [pickerShow, setPickerShow] = useState<boolean>(false)

  const insets = useSafeAreaInsets()

  const { year, month, setMonth, setYear } = useCheckDate()

  const navigation =
    useNavigation<RootStackScreenProps<'CreateCheck'>['navigation']>()

  const checkbooxQuery = useCheckbook({
    year,
    month,
  })

  const onAddCheck = () => {
    navigation.navigate('CreateCheck')
  }

  const incomes = checkbooxQuery.data?.incomes ?? 0

  const amount = checkbooxQuery.data?.amount ?? 0

  const onLogout = () => {
    Alert.alert('Вийти з аккаунту?', '', [
      {
        text: 'Вийти',
        style: 'destructive',
        onPress: () => userMutations.logout.mutate(),
      },
      {
        text: 'Скасувати',
        style: 'cancel',
      },
    ])
  }

  return (
    <SafeAreaView style={tw`flex-1 bg-background`}>
      <ScrollView style={tw`flex-1 pt-4`} contentContainerStyle={tw`pb-18`}>
        <View style={tw`flex-row mb-3 items-center`}>
          <TouchableOpacity style={tw`flex-row`} onPress={onLogout}>
            <Text style={tw`ml-4 text-xs font-gilroy-medium text-gray`}>
              ⚙️ Вийти з аккаунту
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={tw.style(`mr-4 ml-auto p-2 border-[1px] rounded-md`, {
              borderColor: rgba(tw.color('white')!, 0.2),
            })}
            onPress={() => setPickerShow(true)}
          >
            <Text style={tw`text-center text-white font-gilroy-medium text-xs`}>
              📅 {year} {formatMonthToString(month)}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={tw`items-center`}>
          <Text style={tw`text-gray font-gilroy-regular mb-1`}>Прибуток</Text>
          <Text style={tw`text-white font-gilroy-bold text-2xl`}>
            {incomes.toFixed(2)} ₴
          </Text>

          <View
            style={tw.style(`py-2 px-4 mt-2 rounded-lg`, {
              backgroundColor: rgba(tw.color('red')!, 0.2),
            })}
          >
            <Text style={tw`text-red font-gilroy-bold`}>
              - {amount.toFixed(2)} ₴
            </Text>
          </View>

          <Text style={tw`font-gilroy-medium text-white text-center mt-3`}>
            В залишку:{' '}
            <Text style={tw`text-gray font-gilroy-bold`}>
              {incomes - amount} ₴
            </Text>
          </Text>
        </View>

        <Text style={tw`text-white font-gilroy-bold text-base mt-8 ml-4`}>
          Витрати по категоріям
        </Text>

        <View style={tw`mt-2`}>
          {checkbooxQuery.data?.checks.map(check => (
            <CheckCard key={check.category_name} {...check} />
          ))}
        </View>
      </ScrollView>

      <TouchableOpacity
        onPress={onAddCheck}
        style={tw.style(
          `absolute rounded-full bottom-0 right-0 bg-azure w-[64px] h-[64px] items-center justify-center`,
          {
            marginBottom: insets.bottom || 16,
            marginRight: 16,
          },
        )}
      >
        <Text style={tw`font-gilroy-regular text-white text-5xl mt-2`}>+</Text>
      </TouchableOpacity>

      {pickerShow && (
        <MonthPicker
          value={parse(`01-${month}-${year}`, 'dd-MM-yyyy', new Date())}
          onChange={(_, date) => {
            if (date) {
              setYear(getYear(date))
              setMonth(date.getMonth() + 1)
            }

            setPickerShow(false)
          }}
        />
      )}
    </SafeAreaView>
  )
}

export default HomeScreen
