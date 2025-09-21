'use server'

import { revalidatePath } from 'next/cache'
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
