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
import { Switch } from '@/components/ui/switch'
import { Loader2, Save } from 'lucide-react'
import { categorySchema, CategoryValues } from './validation'
import { addCategory, deleteCategory, editCategory } from '../_actions/actions'
import { Category, Organization } from '@/generated/prisma'
import { ConfirmationDialog } from '@/components/custom-ui/ConfirmationDialog'

export function CategoryForm({
  category,
  organization,
}: {
  category?: Category
  organization: Organization | null
}) {
  const [isDeleting, setIsDeleting] = useState(false)

  const defaultValues = useMemo(
    () => ({
      name: category?.name || '',
      active: category ? category?.active : false,
      featured: category ? category?.featured : false,
      organizationId: organization?.id,
    }),
    [category, organization]
  )

  const form = useForm<CategoryValues>({
    resolver: zodResolver(categorySchema),
    defaultValues,
  })

  const { reset } = form

  async function onSubmit(data: CategoryValues) {
    try {
      if (category) {
        // Edit
        const response = await editCategory({
          values: data,
          organizationSlug: organization?.slug || '',
          categoryId: category.id,
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
        const response = await addCategory({
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
      const response = await deleteCategory({
        organizationSlug: organization?.slug || '',
        categoryId: id,
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
          : 'Došlo je do greške prilikom brisanja kategorije. Molimo pokušajte ponovo.'
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
                <Input placeholder='Unesite ime kategorije' {...field} />
              </FormControl>
              <FormDescription>Naziv kategorije</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='active'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='mr-4'>Aktivna</FormLabel>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormDescription>Da li je kategorija aktivna</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='featured'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='mr-4'>Istaknuta</FormLabel>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormDescription>
                Istaknute kategorije će biti promovisane
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className='flex'>
          {category?.id ? (
            <ConfirmationDialog
              confirmAction={() => onDelete(category.id)}
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
