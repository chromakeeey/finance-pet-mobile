import { keyToUrl } from '@tools/common'

export const companyKeys = {
  root: (id?: string) => ['companies', id ?? null] as const,
}

export const companyUrls = {
  root: (id: string) => keyToUrl(companyKeys.root(id)),
}
