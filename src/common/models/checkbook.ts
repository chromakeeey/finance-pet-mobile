
export interface CheckCategory {
  category_name: string
  category_emoji: string
  amount: number
}

export interface Checkbook {
  year: number
  month: number
  amount: number
  incomes: number
  checks: CheckCategory[]
}
