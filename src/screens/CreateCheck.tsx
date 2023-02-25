import { useCategories, useCheckbookMutations } from '@api'
import { zodResolver } from '@hookform/resolvers/zod'
import useCheckDate from '@hooks/useCheckDate'
import { useNavigation } from '@react-navigation/native'
import tw from '@tools/tailwind'
import { Button } from '@uikit/molecules'
import { TextInput } from '@uikit/molecules/form'
import CategoryCard from '@uikit/organisms/CategoryCard'
import { rgba } from 'polished'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { z } from 'zod'
import { RootStackScreenProps } from '.'

export interface CreateCheckForm {
  amount: number
  categoryId: string
}

const CreateCheckScreen = () => {
  const insets = useSafeAreaInsets()

  const categoriesQuery = useCategories()

  const { year, month } = useCheckDate()

  const checkbookMutations = useCheckbookMutations()

  const navigation =
    useNavigation<RootStackScreenProps<'CreateCheck'>['navigation']>()

  const onCreateCategory = () => {
    navigation.navigate('CreateCategory')
  }

  const {
    control,
    formState: { isValid, errors },
    watch,
    setValue,
    handleSubmit,
    trigger,
  } = useForm<CreateCheckForm>({
    reValidateMode: 'onChange',
    mode: 'onChange',
    defaultValues: {
      amount: 0,
      categoryId: '',
    },
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
        categoryId: z.string().min(5),
      }),
    ),
  })

  const categoryId = watch('categoryId')

  useEffect(() => {
    trigger('categoryId')
  }, [categoryId])

  const onMakeIncome = () => {
    navigation.navigate('MakeIncome')
  }

  const onSubmit = handleSubmit(({ amount, categoryId }) => {
    checkbookMutations.createCheck.mutate(
      {
        amount: Number(amount),
        category_id: categoryId,
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
    <View
      style={tw.style(`flex-1 px-4 bg-background`, {
        paddingBottom: insets.bottom || 16,
        paddingTop: 16,
      })}
    >
      <View style={tw`flex-1`}>
        <Text style={tw`text-white text-xl font-gilroy-bold mb-2`}>
          Створити нову витрату
        </Text>

        <TouchableOpacity
          onPress={onMakeIncome}
          style={tw.style(`p-2 rounded-md mr-auto`, {
            backgroundColor: rgba(tw.color('gray')!, 0.2),
          })}
        >
          <Text style={tw`text-gray font-gilroy-bold`}>
            або внести прибуток
          </Text>
        </TouchableOpacity>

        <View style={tw`items-center mt-8`}>
          <Text style={tw`text-center text-white font-gilroy-medium mb-2`}>
            Введіть сумму
          </Text>

          <TextInput
            name="amount"
            control={control}
            style={tw`text-white font-gilroy-bold text-5xl`}
            defaultValue="0"
            maxLength={10}
            keyboardType="numeric"
          />
          <Text style={tw`text-lg text-gray`}>₴ (гривня)</Text>
        </View>

        <ScrollView style={tw`flex-1 mt-3`}>
          {categoriesQuery.data?.map(category => (
            <CategoryCard
              key={category.id}
              {...category}
              selected={category.id === categoryId}
              onPress={() => setValue('categoryId', category.id)}
            />
          ))}
        </ScrollView>
      </View>

      <View>
        <Text style={tw`text-white font-gilroy-medium text-center mb-2`}>
          Немає в списку потрібної категорії?
        </Text>

        <TouchableOpacity style={tw`mb-4`} onPress={onCreateCategory}>
          <Text style={tw`text-white font-gilroy-bold underline text-center`}>
            Створи власну
          </Text>
        </TouchableOpacity>

        <Button title="Створити" disabled={!isValid} onPress={onSubmit} />
      </View>
    </View>
  )
}

export default CreateCheckScreen
