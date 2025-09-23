'use server'

import { revalidatePath } from 'next/cache'
import { InviteSignUpEmailSchemaValues } from '../_components/validation'
import { auth } from '@/lib/auth'
import prisma from '@/lib/db'
import { isBefore } from 'date-fns'

export async function inviteSignUpEmail({
  values,
}: {
  values: InviteSignUpEmailSchemaValues
}) {
  try {
    const { name, email, password, token } = values

    const invitation = await prisma.invitation.findUnique({ where: { token } })

    if (!invitation || invitation.accepted || invitation.email !== email) {
      return {
        status: 'fail',
        message: 'Invalid invitation, please request a new one',
      }
    }

    if (isBefore(invitation.expiresAt, new Date())) {
      return {
        status: 'fail',
        message: 'Invitation has expired, please request a new one',
      }
    }

    const response = await auth.api.signUpEmail({
      body: {
        name,
        email,
        password,
      },
    })

    await prisma.user.update({
      where: { id: response.user.id },
      data: {
        organization: { connect: { id: invitation.organizationId } },
      },
    })

    await prisma.invitation.update({
      where: { token },
      data: { accepted: true },
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
    }
    throw error
  } finally {
    revalidatePath('/dashboard/users')
  }
}
