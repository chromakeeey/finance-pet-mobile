import { FieldValues, useController, UseControllerProps } from 'react-hook-form'
import {
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
} from 'react-native'

export interface TextInputProps<T extends FieldValues>
  extends Omit<RNTextInputProps, 'defaultValue'>,
    UseControllerProps<T> {}

const TextInput = <T extends FieldValues>(props: TextInputProps<T>) => {
  const { field } = useController(props)

  return <RNTextInput {...props} {...field} onChangeText={field.onChange} />
}

export default TextInput
