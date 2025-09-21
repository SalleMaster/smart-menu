'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Loader2, UserPen } from 'lucide-react'

import {
  addOrganizationSchema,
  AddOrganizationSchemaValues,
} from './validation'
import { addOrganization } from '../../_actions/actions'

export default function AddOrganizationForm() {
  const form = useForm<AddOrganizationSchemaValues>({
    resolver: zodResolver(addOrganizationSchema),
    defaultValues: {
      name: '',
      slug: '',
    },
  })

  const isSubmitting = form.formState.isSubmitting

  async function onSubmit(values: AddOrganizationSchemaValues) {
    try {
      const response = await addOrganization({ ...values })
      if (response) {
        if (response.status === 'fail') {
          return toast.warning(response.message)
        }

        if (response.status === 'success') {
          toast.success(response.message)
          form.reset()
        }
      }
    } catch (error) {
      toast.warning(
        error instanceof Error
          ? error.message
          : 'There was an error. Please try again.'
      )
    }
  }

  return (
    <Card className='w-full sm:max-w-md sm:mx-auto'>
      <CardHeader>
        <CardTitle>Add Organization</CardTitle>
        <CardDescription>Add a new client organization</CardDescription>
      </CardHeader>
      <CardContent className='space-y-6'>
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
              <Button type='submit' disabled={isSubmitting} className='ml-auto'>
                {isSubmitting ? (
                  <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                ) : (
                  <UserPen className='mr-2 h-4 w-4' />
                )}
                Add Organization
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
