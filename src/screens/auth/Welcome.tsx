import { useUserMutations } from '@api'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigation } from '@react-navigation/native'
import tw from '@tools/tailwind'
import { Button } from '@uikit/molecules'
import { TextInput } from '@uikit/molecules/form'
import { useForm } from 'react-hook-form'
import {
  Keyboard,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { z } from 'zod'
import { RootStackScreenProps } from '..'

export interface WelcomeScreenForm {
  email: string
  password: string
}

const WelcomeScreen = () => {
  const userMutations = useUserMutations()

  const navigation =
    useNavigation<RootStackScreenProps<'Welcome'>['navigation']>()

  const {
    control,
    formState: { isValid },
    handleSubmit,
  } = useForm<WelcomeScreenForm>({
    defaultValues: {
      email: '',
      password: '',
    },
    reValidateMode: 'onChange',
    mode: 'onChange',
    resolver: zodResolver(
      z.object({
        email: z.string().email(),
        password: z.string().min(1).max(32),
      }),
    ),
  })

  const onSubmit = handleSubmit(({ email, password }) => {
    userMutations.login.mutate({ email, password })
  })

  return (
    <SafeAreaView style={tw`flex-1 bg-background`}>
      <TouchableWithoutFeedback style={tw`flex-1`} onPress={Keyboard.dismiss}>
        <View style={tw`flex-1 justify-center`}>
          <Text style={tw`text-5xl text-center mb-2`}>💸</Text>
          <Text
            style={tw`text-2xl text-center text-white font-gilroy-bold mb-[20%]`}
          >
            Авторизація
          </Text>

          <View style={tw`items-center`}>
            <TextInput
              name="email"
              control={control}
              placeholder="Введіть пошту"
              placeholderTextColor={tw.color('gray')!}
              style={tw`text-white text-base w-[50%] text-center  font-gilroy-medium border-b-2 border-white pb-2 mb-6`}
            />

            <TextInput
              name="password"
              control={control}
              placeholder="Введіть пароль"
              secureTextEntry
              placeholderTextColor={tw.color('gray')!}
              style={tw`text-white text-base w-[50%] text-center font-gilroy-medium border-b-2 border-white pb-2`}
            />

            <Button
              title="Підтвердити"
              disabled={!isValid}
              style={tw`w-[70%] mt-[10%] mb-[5%]`}
              onPress={onSubmit}
            />

            <Text style={tw`text-center text-gray font-gilroy-bold`}>
              Немає аккаунту?
            </Text>

            <TouchableOpacity
              style={tw`mt-1`}
              onPress={() => navigation.navigate('SignUp')}
            >
              <Text
                style={tw`text-center text-white underline font-gilroy-bold`}
              >
                Зареєструйтесь
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  )
}

export default WelcomeScreen
