export const USER_ROLES = {
  ADMIN: 'admin',
  USER: 'user',
} as const

export type UserRoleType = (typeof USER_ROLES)[keyof typeof USER_ROLES]

export type SearchParams = Promise<{
  [key: string]: string | string[] | undefined
}>

export type ActionResponse = {
  status: 'success' | 'fail'
  message: string
}

export type PaginationParams = {
  page: number
  limit: number
}

export type SortOrder = 'asc' | 'desc'

export type SortParams = {
  sortBy: string
  order: SortOrder
}
