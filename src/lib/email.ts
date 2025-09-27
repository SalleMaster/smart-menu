import InviteUserEmail from '@/emails/InviteUserEmail'
import { render } from '@react-email/render'
import { ActionResponse } from '@/lib/types'

type SendInviteEmailParams = {
  to: string
  token: string
  organizationName: string
  inviterName: string
}

export async function sendInviteEmail({
  to,
  token,
  organizationName,
  inviterName,
}: SendInviteEmailParams): Promise<ActionResponse> {
  try {
    if (
      !process.env.PLUNK_API_URL ||
      !process.env.PLUNK_API_KEY ||
      !process.env.NEXT_PUBLIC_BASE_URL
    ) {
      return {
        status: 'fail',
        message: 'Missing required environment variables for email sending.',
      }
    }

    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/invite?token=${token}`

    const body = await render(
      InviteUserEmail({
        url,
        organizationName,
        inviterName,
      })
    )

    const response = await fetch(`${process.env.PLUNK_API_URL}/v1/send`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.PLUNK_API_KEY}`,
      },
      body: JSON.stringify({
        to,
        subject: 'Invitation to join Smart Menu',
        body,
        subscribed: true,
      }),
    })

    const data = await response.json()

    if (!data.success) {
      return {
        status: 'fail',
        message: data.message
          ? `Failed to send invite email: ${data.message}`
          : 'Failed to send invite email',
      }
    }

    return {
      status: 'success',
      message: 'Email sent successfully',
    }
  } catch (error) {
    return {
      status: 'fail',
      message:
        error instanceof Error
          ? `Failed to send invite email: ${error.message}`
          : 'Failed to send invite email: Unknown error',
    }
  }
}
