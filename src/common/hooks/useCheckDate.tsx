import { getMonth, getYear } from 'date-fns'
import { createContext, FC, useContext, useState } from 'react'

interface CheckDateContextProps {
  year: number
  month: number
  setYear: (year: number) => void
  setMonth: (month: number) => void
}

export const CheckDateContext = createContext<CheckDateContextProps>({
  year: getYear(new Date()),
  month: getMonth(new Date()) + 1,
  setYear: () => {},
  setMonth: () => {},
})

export const CheckDateProvider: FC<{
  children?: React.ReactNode
}> = ({ children }) => {
  const [year, setYear] = useState(getYear(new Date()))
  const [month, setMonth] = useState(getMonth(new Date()) + 1)

  return (
    <CheckDateContext.Provider value={{ year, month, setYear, setMonth }}>
      {children}
    </CheckDateContext.Provider>
  )
}

const useCheckDate = () => {
  const context = useContext(CheckDateContext)
  return context
}

export default useCheckDate
