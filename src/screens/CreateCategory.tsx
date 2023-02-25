import { useCategoriesMutations } from '@api'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigation } from '@react-navigation/native'
import tw from '@tools/tailwind'
import { Button } from '@uikit/molecules'
import { TextInput } from '@uikit/molecules/form'
import { useForm } from 'react-hook-form'
import { Keyboard, Text, TouchableWithoutFeedback, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { z } from 'zod'
import { RootStackScreenProps } from '.'

export interface CreateCategoryForm {
  name: string
  emoji: string
}

const CreateCategoryScreen = () => {
  const insets = useSafeAreaInsets()

  const categoriesMutations = useCategoriesMutations()

  const navigation =
    useNavigation<RootStackScreenProps<'CreateCategory'>['navigation']>()

  const {
    control,
    formState: { isValid },
    handleSubmit,
  } = useForm<CreateCategoryForm>({
    defaultValues: {
      name: '',
      emoji: '🤯',
    },
    reValidateMode: 'onChange',
    mode: 'onChange',
    resolver: zodResolver(
      z.object({
        name: z.string().min(2).max(64),
        emoji: z.string().min(1).max(2),
      }),
    ),
  })

  const onSubmit = handleSubmit(({ name, emoji }) => {
    categoriesMutations.createCategory.mutate(
      {
        name,
        emoji,
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
      <TouchableWithoutFeedback style={tw`flex-1`} onPress={Keyboard.dismiss}>
        <View style={tw`flex-1`}>
          <Text style={tw`text-white text-xl font-gilroy-bold mb-2`}>
            Створення категорії
          </Text>

          <View style={tw`flex-1 mt-[40%]`}>
            <View style={tw`items-center`}>
              <Text style={tw`text-center text-white font-gilroy-medium mb-5`}>
                Введіть емодзі
              </Text>

              <TextInput
                control={control}
                name="emoji"
                style={tw`text-white font-gilroy-bold text-5xl border-b-2 border-white`}
                defaultValue="🤯22"
                maxLength={10}
              />
            </View>

            <Text
              style={tw`text-center text-white font-gilroy-medium mb-5 mt-[20%]`}
            >
              Введіть назву
            </Text>

            <TextInput
              control={control}
              name="name"
              style={tw`text-white font-gilroy-bold text-xl border-b-2 border-white pb-4 text-center`}
              maxLength={10}
              placeholder="Введіть назву ..."
              placeholderTextColor={tw.color('gray')}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>

      <Button title="Створити" disabled={!isValid} onPress={onSubmit} />
    </View>
  )
}

export default CreateCategoryScreen
