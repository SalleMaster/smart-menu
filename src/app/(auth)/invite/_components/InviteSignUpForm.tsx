'use client'

import Link from 'next/link'
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
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'

import {
  inviteSignUpEmailSchema,
  InviteSignUpEmailSchemaValues,
} from './validation'
import { inviteSignUpEmail } from '../_actions/actions'
import { Loader2, UserPen } from 'lucide-react'

type Props = {
  token: string
  email: string
}

export default function InviteSignUpForm({ token, email }: Props) {
  const form = useForm<InviteSignUpEmailSchemaValues>({
    resolver: zodResolver(inviteSignUpEmailSchema),
    defaultValues: {
      token,
      name: '',
      email,
      password: '',
      confirmPassword: '',
    },
  })

  async function onSubmit(values: InviteSignUpEmailSchemaValues) {
    try {
      const response = await inviteSignUpEmail({ values })
      if (response) {
        if (response.status === 'fail') {
          return toast.warning(response.message)
        }

        if (response.status === 'success') {
          toast.success(response.message)
          // Reset form after submission
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

  const isSubmitting = form.formState.isSubmitting

  return (
    <Card className='w-full sm:max-w-md'>
      <CardHeader>
        <CardTitle>Sign up</CardTitle>
        <CardDescription>Welcome! Create your account</CardDescription>
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
                      placeholder='John Doe'
                      {...field}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormDescription>Public display name.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

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
                      disabled
                    />
                  </FormControl>
                  <FormDescription>Email address.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type='password'
                      placeholder='••••••••'
                      {...field}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormDescription>Account password.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='confirmPassword'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      type='password'
                      placeholder='••••••••'
                      {...field}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormDescription>Confirm your password.</FormDescription>
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
                Sign Up
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
      <CardFooter className='flex justify-center'>
        <span className='text-sm text-muted-foreground'>
          Have an account?{' '}
          <Link
            href='/signin'
            className='text-primary underline hover:opacity-80'
          >
            Sign in
          </Link>
        </span>
      </CardFooter>
    </Card>
  )
}
