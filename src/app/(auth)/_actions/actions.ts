'use server'

import { revalidatePath } from 'next/cache'

import { auth } from '@/lib/auth'
import { SignInWithEmailSchemaValues } from '../signin/_components/validation'

export async function signInWithEmail(values: SignInWithEmailSchemaValues) {
  const { email, password } = values

  try {
    const response = await auth.api.signInEmail({
      body: {
        email,
        password,
      },
    })

    return {
      status: 'success',
      message: 'Signed in successfully',
      data: response,
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
    revalidatePath('/dashboard')
  }
}
