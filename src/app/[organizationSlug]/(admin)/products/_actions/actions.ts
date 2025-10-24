'use server'

import { revalidatePath } from 'next/cache'
import { ownerActionGuard } from '@/lib/actionGuard'
import prisma from '@/lib/db'
import { ActionResponse } from '@/lib/types'
import { productSchema, ProductValues } from '../_components/validation'

export async function addProduct({
  values,
  organizationSlug,
}: {
  values: ProductValues
  organizationSlug: string
}): Promise<ActionResponse> {
  try {
    await ownerActionGuard({ organizationSlug })

    const { name, description, price, categories, organizationId } =
      productSchema.parse(values)

    await prisma.product.create({
      data: {
        name,
        description,
        price,
        organizationId,
        categories: {
          connect: categories.map((id) => ({ id })),
        },
      },
    })

    return {
      status: 'success',
      message: 'Proizvod je uspešno kreiran',
    }
  } catch (error) {
    return {
      status: 'fail',
      message: error instanceof Error ? error.message : 'Nepoznata greška',
    }
  } finally {
    revalidatePath(`/${organizationSlug}/products`)
  }
}

export async function editProduct({
  values,
  organizationSlug,
  id,
}: {
  values: ProductValues
  organizationSlug: string
  id: string
}): Promise<ActionResponse> {
  try {
    await ownerActionGuard({ organizationSlug })

    const { name, description, price, categories, organizationId } =
      productSchema.parse(values)

    await prisma.product.update({
      where: { id },
      data: {
        name,
        description,
        price,
        organizationId,
        categories: {
          connect: categories.map((id) => ({ id })),
        },
      },
    })

    return {
      status: 'success',
      message: 'Proizvod je uspešno izmenjen',
    }
  } catch (error) {
    return {
      status: 'fail',
      message: error instanceof Error ? error.message : 'Nepoznata greška',
    }
  } finally {
    revalidatePath(`/${organizationSlug}/products`)
  }
}

export async function deleteProduct({
  organizationSlug,
  id,
}: {
  organizationSlug: string
  id: string
}): Promise<ActionResponse> {
  try {
    await ownerActionGuard({ organizationSlug })

    await prisma.product.delete({
      where: { id },
    })

    return {
      status: 'success',
      message: 'Proizvod je uspešno izbrisan',
    }
  } catch (error) {
    return {
      status: 'fail',
      message: error instanceof Error ? error.message : 'Nepoznata greška',
    }
  } finally {
    revalidatePath(`/${organizationSlug}/products`)
  }
}
