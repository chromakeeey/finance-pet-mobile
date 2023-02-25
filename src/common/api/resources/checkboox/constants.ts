export const checkbooxKeys = {
  root: (month: number, year: number) => ['checkbook', month, year] as const,
}

export const checkbooxUrls = {
  root: '/checkbook',
  income: '/incomes',
}
