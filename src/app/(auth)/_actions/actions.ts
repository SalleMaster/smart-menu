'use server'

import { revalidatePath } from 'next/cache'

import { auth } from '@/lib/auth'
import { SignInWithEmailSchemaValues } from '../signin/_components/validation'
import getSession from '@/lib/getSession'
import prisma from '@/lib/db'

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
    revalidatePath('/invite')
    revalidatePath('/signin')
  }
}

export async function getLoggedInUserCallbackUrl() {
  try {
    const session = await getSession()

    if (!session) {
      return {
        status: 'fail',
        message: 'User is not logged in',
        callbackUrl: '/signin',
      }
    }

    if (session.user.role === 'admin') {
      return {
        status: 'success',
        message: 'User is admin',
        callbackUrl: '/dashboard',
      }
    }

    const usersOrganization = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        organization: true,
      },
    })

    if (usersOrganization?.organization?.slug) {
      return {
        status: 'success',
        message: 'Signed in successfully',
        callbackUrl: `/${usersOrganization.organization.slug}/categories`,
      }
    }

    return {
      status: 'fail',
      message: 'User does not belong to any organization',
      callbackUrl: '/',
    }
  } catch (error) {
    if (error instanceof Error) {
      return {
        status: 'fail',
        message: error.message,
        callbackUrl: '/signin',
      }
    } else {
      throw error
    }
  }
}
