import { useCheckbookMutations } from '@api'
import { zodResolver } from '@hookform/resolvers/zod'
import useCheckDate from '@hooks/useCheckDate'
import { useNavigation } from '@react-navigation/native'
import tw from '@tools/tailwind'
import { Button } from '@uikit/molecules'
import { TextInput } from '@uikit/molecules/form'
import { useForm } from 'react-hook-form'
import { Keyboard, Text, TouchableWithoutFeedback, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { z } from 'zod'
import { RootStackScreenProps } from '.'

export interface MakeIncomeForm {
  amount: number
}

const MakeIncomeScreen = () => {
  const insets = useSafeAreaInsets()

  const checkbookMutations = useCheckbookMutations()

  const { year, month } = useCheckDate()

  const navigation =
    useNavigation<RootStackScreenProps<'MakeIncome'>['navigation']>()

  const {
    control,
    formState: { isValid },
    handleSubmit,
  } = useForm<MakeIncomeForm>({
    defaultValues: {
      amount: 0,
    },
    reValidateMode: 'onChange',
    mode: 'onChange',
    resolver: zodResolver(
      z.object({
        amount: z.string().refine(
          val => {
            const isNumber = !Number.isNaN(Number(val))

            if (!isNumber) {
              return false
            }

            if (isNumber && Number(val) <= 0) {
              return false
            }

            return true
          },
          {
            message: 'Expected number, received a string',
          },
        ),
      }),
    ),
  })

  const onSubmit = handleSubmit(({ amount }) => {
    checkbookMutations.createIncome.mutate(
      {
        amount: Number(amount),
        year,
        month,
      },
      {
        onSuccess: () => {
          navigation.goBack()
        },
      },
    )
  })

  return (
    <TouchableWithoutFeedback style={tw`flex-1`} onPress={Keyboard.dismiss}>
      <View
        style={tw.style(`flex-1 px-4 bg-background`, {
          paddingBottom: insets.bottom || 16,
          paddingTop: 16,
        })}
      >
        <View style={tw`flex-1`}>
          <Text style={tw`text-white text-xl font-gilroy-bold mb-2`}>
            Додати прибуток
          </Text>

          <Text style={tw`text-center text-5xl mt-[30%]`}>💸</Text>

          <View style={tw`flex-1 items-center`}>
            <Text
              style={tw`text-center text-white font-gilroy-medium mb-5 mt-[20%]`}
            >
              Введіть сумму
            </Text>

            <TextInput
              name="amount"
              control={control}
              style={tw`text-white font-gilroy-bold text-5xl border-b-2 border-white min-w-[60px] text-center`}
              maxLength={10}
              keyboardType="numeric"
              autoFocus
              defaultValue={0}
            />

            <Text style={tw`text-lg text-gray mt-2`}>₴ (гривня)</Text>
          </View>
        </View>

        <Button title="Додати" disabled={!isValid} onPress={onSubmit} />
      </View>
    </TouchableWithoutFeedback>
  )
}

export default MakeIncomeScreen
