import {
  Html,
  Link,
  Body,
  Column,
  Container,
  Head,
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
} from '@react-email/components'
import { EmailHeader } from '@/emails/components/EmailHeader'
import { EmailFooter } from '@/emails/components/EmailFooter'

type Props = {
  url: string
  organizationName: string
  inviterName: string
}

InviteUserEmail.PreviewProps = {
  url: 'https://smart-menu.radovanovic.net/invite/accept?token=some-token',
  organizationName: 'Awesome.io',
  inviterName: 'John Doe',
}

export default function InviteUserEmail({
  url,
  organizationName,
  inviterName,
}: Props) {
  return (
    <Html lang='en'>
      <Preview>Invitation to join Smart Menu Organization</Preview>
      <Tailwind>
        <Head />
        <Body className='font-sans bg-white'>
          <Container className='min-h-full max-w-xl'>
            <EmailHeader />
            <Section>
              <Row>
                <Column align='center'>
                  <Text>
                    You have been invited by {inviterName} to join{' '}
                    <span className='font-bold'>{organizationName}</span>{' '}
                    organization.
                  </Text>
                  <Text>
                    Click the button below to accept the invitation and set up
                    your account.
                  </Text>
                </Column>
              </Row>
              <Row>
                <Column align='center'>
                  <Link
                    href={url}
                    aria-label='Accept invitation to join Smart Menu'
                    className='inline-block p-2 bg-black text-white rounded-lg text-sm'
                  >
                    Accept invite
                  </Link>
                </Column>
              </Row>
            </Section>
            <EmailFooter />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}
