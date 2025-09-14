'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
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
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Loader2, UserPen } from 'lucide-react'

import {
  signInWithEmailSchema,
  SignInWithEmailSchemaValues,
} from './validation'
import { signInWithEmail } from '../../_actions/actions'

export default function SignInForm() {
  const router = useRouter()

  const form = useForm<SignInWithEmailSchemaValues>({
    resolver: zodResolver(signInWithEmailSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const isSubmitting = form.formState.isSubmitting

  async function onSubmit(values: SignInWithEmailSchemaValues) {
    try {
      const response = await signInWithEmail({ ...values })
      if (response) {
        if (response.status === 'fail') {
          return toast.warning(response.message)
        }

        if (response.status === 'success') {
          toast.success(response.message)
          form.reset()
          router.push('/dashboard')
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
    <Card className='w-full sm:max-w-md'>
      <CardHeader>
        <CardTitle>Sign in</CardTitle>
        <CardDescription>Welcome back! Sign in to your account</CardDescription>
      </CardHeader>
      <CardContent className='space-y-6'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
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
                Sign In
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
      <CardFooter className='flex justify-center'>
        <span className='text-sm text-muted-foreground'>
          Don&apos;t have an account?{' '}
          <a
            href='mailto:support@example.com'
            className='text-primary underline hover:opacity-80'
          >
            Contact us
          </a>
        </span>
      </CardFooter>
    </Card>
  )
}
