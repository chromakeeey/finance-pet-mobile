import { useUser } from '@api'
import {
  createStackNavigator,
  StackScreenProps,
  TransitionPresets
} from '@react-navigation/stack'
import { WelcomeScreen } from '@screens/auth'
import SignUpScreen from './auth/SignUp'
import CreateCategoryScreen from './CreateCategory'
import CreateCheckScreen from './CreateCheck'
import HomeScreen from './Home'
import MakeIncomeScreen from './MakeIncome'

export type RootStackParamList = {
  // #region unauthorized
  Welcome: undefined
  SignUp: undefined
  // #endregion

  // #region authorized
  Home: undefined
  CreateCheck: undefined
  CreateCategory: undefined
  MakeIncome: undefined
  // #endregion
}

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  StackScreenProps<RootStackParamList, T>

const Stack = createStackNavigator<RootStackParamList>()

const RootRouter = () => {
  const userQuery = useUser()

  return (
    <Stack.Navigator
      initialRouteName="Welcome"
      screenOptions={{
        headerShown: false,
        ...TransitionPresets.SlideFromRightIOS,
      }}
    >
      {userQuery.data ? (
        <>
          <Stack.Screen name="Home" component={HomeScreen} />

          <Stack.Group
            screenOptions={{
              presentation: 'modal',
              ...TransitionPresets.ModalPresentationIOS,
            }}
          >
            <Stack.Screen name="CreateCheck" component={CreateCheckScreen} />

            <Stack.Screen
              name="CreateCategory"
              component={CreateCategoryScreen}
            />

            <Stack.Screen name="MakeIncome" component={MakeIncomeScreen} />
          </Stack.Group>
        </>
      ) : (
        <>
          <Stack.Screen name="Welcome" component={WelcomeScreen} />

          <Stack.Group
            screenOptions={{
              presentation: 'modal',
              ...TransitionPresets.ModalPresentationIOS,
            }}
          >
            <Stack.Screen name="SignUp" component={SignUpScreen} />
          </Stack.Group>
        </>
      )}
    </Stack.Navigator>
  )
}

export default RootRouter
