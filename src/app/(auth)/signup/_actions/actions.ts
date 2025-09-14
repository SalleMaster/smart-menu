'use server'

import { revalidatePath } from 'next/cache'
import { SignUpEmailSchemaValues } from '../_components/validation'
import { auth } from '@/lib/auth'

export async function signUpEmail(values: SignUpEmailSchemaValues) {
  try {
    const { name, email, password } = values

    await auth.api.signUpEmail({
      body: {
        name,
        email,
        password,
      },
    })

    return {
      status: 'success',
      message: 'Signed up successfully',
    }
  } catch (error) {
    if (error instanceof Error) {
      return {
        status: 'fail',
        message: error.message,
      }
    } else {
      throw error
    }
  } finally {
    revalidatePath('/dashboard/users')
  }
}
