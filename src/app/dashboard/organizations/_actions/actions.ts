'use server'

import { revalidatePath } from 'next/cache'
import { nanoid } from 'nanoid'
import { addDays } from 'date-fns'
import {
  addOrganizationSchema,
  AddOrganizationSchemaValues,
} from '../add/_components/validation'
import { adminActionGuard } from '@/lib/actionGuard'
import prisma from '@/lib/db'
import {
  editOrganizationSchema,
  EditOrganizationValues,
} from '../_components/validation'
import { ActionResponse } from '@/lib/types'
import {
  inviteUserSchema,
  InviteUserValues,
} from '../[slug]/_components/validation'
import { getUser } from '@/data/services/users'
import { sendInviteEmail } from '@/lib/email'

export async function addOrganization(
  values: AddOrganizationSchemaValues
): Promise<ActionResponse> {
  try {
    await adminActionGuard()

    const data = addOrganizationSchema.parse(values)

    await prisma.organization.create({
      data,
    })

    return {
      status: 'success',
      message: 'Organization added successfully',
    }
  } catch (error) {
    return {
      status: 'fail',
      message: error instanceof Error ? error.message : 'Unknown error',
    }
  } finally {
    revalidatePath('/dashboard/organizations')
  }
}

export async function editOrganization({
  id,
  values,
}: {
  id: string
  values: EditOrganizationValues
}): Promise<ActionResponse> {
  try {
    await adminActionGuard()

    const data = editOrganizationSchema.parse(values)

    await prisma.organization.update({
      where: { id },
      data,
    })

    return {
      status: 'success',
      message: 'Organization updated successfully',
    }
  } catch (error) {
    return {
      status: 'fail',
      message: error instanceof Error ? error.message : 'Unknown error',
    }
  } finally {
    revalidatePath('/dashboard/organizations')
  }
}

export async function deleteOrganization({
  id,
}: {
  id: string
}): Promise<ActionResponse> {
  try {
    await adminActionGuard()

    await prisma.organization.delete({
      where: { id },
    })

    return {
      status: 'success',
      message: 'Organization deleted successfully',
    }
  } catch (error) {
    return {
      status: 'fail',
      message: error instanceof Error ? error.message : 'Unknown error',
    }
  } finally {
    revalidatePath('/dashboard/organizations')
  }
}

export async function inviteUser({
  values,
  organizationSlug,
  organizationName,
}: {
  values: InviteUserValues
  organizationSlug: string
  organizationName: string
}): Promise<ActionResponse> {
  try {
    const { userId: invitedById, userName } = await adminActionGuard()

    const data = inviteUserSchema.parse(values)

    const existingUser = await getUser({
      where: { email: data.email },
    })

    if (existingUser) {
      return {
        status: 'fail',
        message: 'A user with this email already exists',
      }
    }

    const token = nanoid(32)
    const expiresAt = addDays(new Date(), 1)

    const emailResult = await sendInviteEmail({
      token,
      to: data.email,
      organizationName,
      inviterName: userName || 'Admin',
    })

    if (emailResult.status !== 'success') {
      return {
        status: 'fail',
        message: emailResult.message,
      }
    }

    await prisma.invitation.create({
      data: { ...data, token, expiresAt, invitedById },
    })

    return {
      status: 'success',
      message: 'User invited successfully',
    }
  } catch (error) {
    return {
      status: 'fail',
      message: error instanceof Error ? error.message : 'Unknown error',
    }
  } finally {
    revalidatePath(`/dashboard/organizations/${organizationSlug}`)
  }
}
