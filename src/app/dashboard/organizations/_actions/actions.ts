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
  slug,
}: {
  values: InviteUserValues
  slug: string
}) {
  try {
    const { userId: invitedById } = await adminActionGuard()

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

    await prisma.invitation.create({
      data: { ...data, token, expiresAt, invitedById },
    })

    // Here you would typically send an email to the invited user with the token link

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
    revalidatePath(`/dashboard/organizations/${slug}`)
  }
}
