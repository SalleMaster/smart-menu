'use client'

import { useMemo, useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { zodResolver } from '@hookform/resolvers/zod'
import { Organization } from '@/generated/prisma'
import { editOrganizationSchema, EditOrganizationValues } from './validation'
import { editOrganization, deleteOrganization } from '../_actions/actions'

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
import { ConfirmationDialog } from '@/components/custom-ui/ConfirmationDialog'
import { Loader2, Save } from 'lucide-react'
import { Label } from '@/components/ui/label'

type Props = {
  organization: Organization
}

export function EditOrganizationForm({ organization }: Props) {
  const [isDeleting, setIsDeleting] = useState(false)

  const { name, slug } = organization

  const defaultValues = useMemo(
    () => ({
      name,
      slug,
    }),
    [organization]
  )

  const form = useForm<EditOrganizationValues>({
    resolver: zodResolver(editOrganizationSchema),
    defaultValues,
  })

  const { reset } = form

  const isSubmitting = form.formState.isSubmitting

  async function onSubmit(data: EditOrganizationValues) {
    try {
      const response = await editOrganization({
        id: organization.id,
        values: data,
      })

      if (response.status === 'success') {
        toast.success(response.message)
      }

      if (response.status === 'fail') {
        toast.warning(response.message)
      }
    } catch (error) {
      toast.warning(
        error instanceof Error
          ? error.message
          : 'There was an error. Please try again.'
      )
    }
  }

  const onDelete = async (id: string) => {
    setIsDeleting(true)
    try {
      const response = await deleteOrganization({ id })

      if (response.status === 'success') {
        toast.success(response.message)
      }

      if (response.status === 'fail') {
        toast.warning(response.message)
      }
    } catch (error) {
      toast.warning(
        error instanceof Error
          ? error.message
          : 'There was an error. Please try again.'
      )
    } finally {
      setIsDeleting(false)
    }
  }

  useEffect(() => {
    reset(defaultValues)
  }, [defaultValues, reset])

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder='Some company'
                  disabled={isSubmitting}
                />
              </FormControl>
              <FormDescription>Organization name</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='slug'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Slug</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder='some-company'
                  disabled={isSubmitting}
                />
              </FormControl>
              <FormDescription>Organization slug</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className='flex'>
          <ConfirmationDialog
            confirmAction={() => onDelete(organization.id)}
            isLoading={isDeleting}
            isDisabled={isDeleting || isSubmitting}
          />

          <Button
            type='submit'
            disabled={isDeleting || isSubmitting}
            className='ml-auto'
          >
            {isSubmitting ? (
              <Loader2 className='mr-2 h-4 w-4 animate-spin' />
            ) : (
              <Save className='mr-2 h-4 w-4' />
            )}
            Edit Organization
          </Button>
        </div>
      </form>
    </Form>
  )
}

export function EditOrganizationFormSkeleton() {
  return (
    <div className='space-y-4'>
      <div className='grid gap-2'>
        <Label>Name</Label>
        <Input placeholder='Some company' disabled />
        <p className={'text-muted-foreground text-sm'}>Organization name</p>
      </div>
      <div className='grid gap-2'>
        <Label>Slug</Label>
        <Input placeholder='some-company' disabled />
        <p className={'text-muted-foreground text-sm'}>Organization slug</p>
      </div>
      <div className='flex'>
        <Button disabled variant='destructive'>
          Delete
        </Button>
        <Button disabled className='ml-auto'>
          <Save className='mr-2 h-4 w-4' />
          Edit Organization
        </Button>
      </div>
    </div>
  )
}
