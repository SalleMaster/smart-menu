'use server'

import { revalidatePath } from 'next/cache'
import { AddUserSchemaValues } from '../_components/validation'
import { auth } from '@/lib/auth'

export async function addUser(values: AddUserSchemaValues) {
  try {
    // await adminActionGuard()

    const { name, email, password } = values

    const data = await auth.api.signUpEmail({
      body: {
        name,
        email,
        password,
        // image: "https://example.com/image.png",
        // callbackURL: "https://example.com/callback",
      },
    })

    console.log('User created:', data)

    return {
      status: 'success',
      message: 'User added successfully',
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
