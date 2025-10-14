'use server'

import { revalidatePath } from 'next/cache'
import { ownerActionGuard } from '@/lib/actionGuard'
import prisma from '@/lib/db'
import { ActionResponse } from '@/lib/types'
import { categorySchema, CategoryValues } from '../_components/validation'

export async function addCategory({
  values,
  organizationSlug,
}: {
  values: CategoryValues
  organizationSlug: string
}): Promise<ActionResponse> {
  try {
    await ownerActionGuard({ organizationSlug })

    const data = categorySchema.parse(values)

    await prisma.category.create({
      data,
    })

    return {
      status: 'success',
      message: 'Kategorija je uspešno kreirana',
    }
  } catch (error) {
    return {
      status: 'fail',
      message: error instanceof Error ? error.message : 'Nepoznata greška',
    }
  } finally {
    revalidatePath(`/${organizationSlug}/categories`)
  }
}

export async function editCategory({
  values,
  organizationSlug,
  categoryId,
}: {
  values: CategoryValues
  organizationSlug: string
  categoryId: string
}): Promise<ActionResponse> {
  try {
    await ownerActionGuard({ organizationSlug })

    const data = categorySchema.parse(values)

    await prisma.category.update({
      where: { id: categoryId },
      data,
    })

    return {
      status: 'success',
      message: 'Kategorija je uspešno izmenjena',
    }
  } catch (error) {
    return {
      status: 'fail',
      message: error instanceof Error ? error.message : 'Nepoznata greška',
    }
  } finally {
    revalidatePath(`/${organizationSlug}/categories`)
  }
}

export async function deleteCategory({
  organizationSlug,
  categoryId,
}: {
  organizationSlug: string
  categoryId: string
}): Promise<ActionResponse> {
  try {
    await ownerActionGuard({ organizationSlug })

    await prisma.category.delete({
      where: { id: categoryId },
    })

    return {
      status: 'success',
      message: 'Kategorija je uspešno izbrisana',
    }
  } catch (error) {
    return {
      status: 'fail',
      message: error instanceof Error ? error.message : 'Nepoznata greška',
    }
  } finally {
    revalidatePath(`/${organizationSlug}/categories`)
  }
}
