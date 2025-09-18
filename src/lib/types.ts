export const USER_ROLES = {
  ADMIN: 'admin',
  USER: 'user',
} as const

export type UserRoleType = (typeof USER_ROLES)[keyof typeof USER_ROLES]

export type SearchParams = Promise<{
  [key: string]: string | string[] | undefined
}>
