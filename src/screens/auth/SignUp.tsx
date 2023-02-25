import { useUserMutations } from '@api'
import { zodResolver } from '@hookform/resolvers/zod'
import tw from '@tools/tailwind'
import { Button } from '@uikit/molecules'
import { TextInput } from '@uikit/molecules/form'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Keyboard, Text, TouchableWithoutFeedback, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { z } from 'zod'

export interface WelcomeScreenForm {
  email: string
  name: string
  password: string
}

const SignUpScreen = () => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const userMutations = useUserMutations()

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
        name: z.string().min(1).max(32),
        password: z.string().min(1).max(32),
      }),
    ),
  })

  const onSubmit = handleSubmit(({ email, password, name }) => {
    userMutations.signUp.mutate({ email, password, name })
  })

  return (
    <SafeAreaView style={tw`flex-1 bg-background`}>
      <TouchableWithoutFeedback style={tw`flex-1`} onPress={Keyboard.dismiss}>
        <View style={tw`flex-1 justify-center pb-[20%]`}>
          <Text style={tw`text-5xl text-center mb-2`}>👨</Text>
          <Text
            style={tw`text-2xl text-center text-white font-gilroy-bold mb-[20%]`}
          >
            Реєстрація
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
              name="name"
              control={control}
              placeholder="Введіть імʼя"
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
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  )
}

export default SignUpScreen
