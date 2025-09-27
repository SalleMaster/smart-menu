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

import { inviteUserSchema, InviteUserValues } from './validation'
import { inviteUser } from '../../_actions/actions'

type Props = {
  organizationId: string
  organizationSlug: string
  organizationName: string
}

export default function InviteUserForm({
  organizationId,
  organizationSlug,
  organizationName,
}: Props) {
  const form = useForm<InviteUserValues>({
    resolver: zodResolver(inviteUserSchema),
    defaultValues: {
      email: '',
      organizationId,
    },
  })

  const isSubmitting = form.formState.isSubmitting

  async function onSubmit(values: InviteUserValues) {
    try {
      const response = await inviteUser({
        values,
        organizationSlug,
        organizationName,
      })
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
    <Card>
      <CardHeader>
        <CardTitle>Invite User</CardTitle>
        <CardDescription>Invite a user to your organization</CardDescription>
      </CardHeader>
      <CardContent className='space-y-6'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='john.doe@example.com'
                      {...field}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormDescription>Email address</FormDescription>
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
                Send Invite
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
