import { format, parseISO } from 'date-fns'
export { isWithinInterval, parseISO } from 'date-fns'

export const getNowTimestamp = () => new Date().toISOString()

type FormatType = 'date' | 'dayOfWeek' | 'time' | 'verboseTime'

const formatToSchema: Record<FormatType, string> = {
  date: 'dd.LL.uuuu',
  dayOfWeek: 'EEE',
  time: 'HH:mm',
  verboseTime: 'HH:mm:ss',
}

export const removeOffset = (date: string | Date) => {
  const dt = date instanceof Date ? date : parseISO(date)
  return new Date(dt.valueOf() + dt.getTimezoneOffset() * 60 * 1000)
}

export const formatDate = (
  date: string | Date,
  formatType: FormatType,
  withOffset = true,
) => {
  const dt = date instanceof Date ? date : parseISO(date)
  const dtDateOnly = withOffset ? dt : removeOffset(dt)

  const formattedDate = format(dtDateOnly, formatToSchema[formatType])
  return formattedDate
}

export const getTimeZoneOffset = (timestamp: number) =>
  new Date(timestamp).getTimezoneOffset() / -60

export const formatMonthToString = (month: number) => {
  const MONTH_NAMES: Record<number, string> = {
    1: 'Січень',
    2: 'Лютий',
    3: 'Березень',
    4: 'Квітень',
    5: 'Травень',
    6: 'Червень',
    7: 'Липень',
    8: 'Серпень',
    9: 'Вересень',
    10: 'Жовтень',
    11: 'Листопад',
    12: 'Грудень',
  }

  return MONTH_NAMES[month]
}
