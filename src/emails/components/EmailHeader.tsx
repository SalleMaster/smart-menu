import { Column, Row, Section, Text, Link } from '@react-email/components'

export function EmailHeader() {
  return (
    <Link href={process.env.NEXT_PUBLIC_BASE_URL}>
      <Section className='w-full rounded-lg bg-gray-50 mt-4 mb-6 p-5'>
        <Row>
          <Column align='center'>
            <Text className='text-lg font-bold text-gray-600'>Smart Menu</Text>
            <Text className='text-sm text-gray-600'>
              The smart way to manage and promote your organization's services
            </Text>
          </Column>
        </Row>
      </Section>
    </Link>
  )
}
