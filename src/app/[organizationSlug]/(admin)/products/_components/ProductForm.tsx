'use client'

import { useMemo, useState, useEffect } from 'react'
import { toast } from 'sonner'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Loader2, Save } from 'lucide-react'
import { productSchema, ProductValues } from './validation'
import { addProduct, deleteProduct, editProduct } from '../_actions/actions'
import { Category, Organization, Product } from '@/generated/prisma'
import { ConfirmationDialog } from '@/components/custom-ui/ConfirmationDialog'
import {
  MultiSelect,
  MultiSelectContent,
  MultiSelectGroup,
  MultiSelectItem,
  MultiSelectTrigger,
  MultiSelectValue,
} from '@/components/ui/multi-select'

export function ProductForm({
  product,
  organization,
  categories,
}: {
  product?: Product & { categories: Category[] }
  organization: Organization | null
  categories: Category[]
}) {
  const [isDeleting, setIsDeleting] = useState(false)

  const defaultValues = useMemo(
    () => ({
      name: product?.name || '',
      description: product?.description || '',
      price: product?.price || 0,
      categories: product?.categories.map((category) => category.id) || [],
      organizationId: organization?.id,
    }),
    [product, organization]
  )

  const form = useForm<ProductValues>({
    resolver: zodResolver(productSchema),
    defaultValues,
  })

  const { reset } = form

  async function onSubmit(data: ProductValues) {
    try {
      if (product) {
        // Edit
        const response = await editProduct({
          values: data,
          organizationSlug: organization?.slug || '',
          id: product.id,
        })

        if (response) {
          if (response.status === 'fail') {
            return toast.warning(response.message)
          }

          if (response.status === 'success') {
            toast.success(response.message)
          }
        }
      } else {
        // Add new
        const response = await addProduct({
          values: data,
          organizationSlug: organization?.slug || '',
        })
        if (response) {
          if (response.status === 'fail') {
            return toast.warning(response.message)
          }

          if (response.status === 'success') {
            toast.success(response.message)
            // Reset form after submission
            form.reset(defaultValues)
          }
        }
      }
    } catch (error) {
      toast.warning(
        error instanceof Error
          ? error.message
          : 'Došlo je do greške. Molimo pokušajte ponovo.'
      )
    }
  }

  const onDelete = async (id: string) => {
    setIsDeleting(true)
    try {
      const response = await deleteProduct({
        organizationSlug: organization?.slug || '',
        id,
      })
      if (response) {
        if (response.status === 'fail') {
          return toast.warning(response.message)
        }

        if (response.status === 'success') {
          toast.success(response.message)
        }
      }
    } catch (error) {
      toast.warning(
        error instanceof Error
          ? error.message
          : 'Došlo je do greške prilikom brisanja proizvoda. Molimo pokušajte ponovo.'
      )
    } finally {
      setIsDeleting(false)
    }
  }

  // Use useEffect to reset the form when the prop changes
  useEffect(() => {
    reset(defaultValues)
  }, [defaultValues, reset])

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex flex-col gap-2.5'
      >
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Naziv</FormLabel>
              <FormControl>
                <Input placeholder='Unesite naziv proizvoda' {...field} />
              </FormControl>
              <FormDescription>Naziv proizvoda</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='description'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Opis</FormLabel>
              <FormControl>
                <Input placeholder='Unesite opis proizvoda' {...field} />
              </FormControl>
              <FormDescription>Opis proizvoda</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='price'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cena</FormLabel>
              <FormControl>
                <Input
                  type='number'
                  min={0}
                  step={0.01}
                  placeholder='Unesite cenu proizvoda'
                  {...field}
                />
              </FormControl>
              <FormDescription>Cena proizvoda</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='categories'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Kategorije</FormLabel>
              <FormControl>
                <MultiSelect
                  onValuesChange={field.onChange}
                  values={field.value}
                >
                  <MultiSelectTrigger>
                    <MultiSelectValue placeholder='Izaberite kategorije...' />
                  </MultiSelectTrigger>
                  <MultiSelectContent>
                    <MultiSelectGroup>
                      {categories.map((category) => (
                        <MultiSelectItem value={category.id} key={category.id}>
                          {category.name}
                        </MultiSelectItem>
                      ))}
                    </MultiSelectGroup>
                  </MultiSelectContent>
                </MultiSelect>
              </FormControl>
              <FormDescription>Kategorije proizvoda</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className='flex'>
          {product?.id ? (
            <ConfirmationDialog
              confirmAction={() => onDelete(product.id)}
              isLoading={isDeleting}
              isDisabled={isDeleting || form.formState.isSubmitting}
            />
          ) : null}
          <Button
            type='submit'
            disabled={isDeleting || form.formState.isSubmitting}
            className='ml-auto'
          >
            {form.formState.isSubmitting ? (
              <Loader2 className='mr-2 h-4 w-4 animate-spin' />
            ) : (
              <Save className='mr-2 h-4 w-4' />
            )}
            Sačuvaj
          </Button>
        </div>
      </form>
    </Form>
  )
}
