import { Column, Row, Section, Text } from '@react-email/components'

export function EmailFooter() {
  return (
    <Section className='w-full text-sm rounded-lg bg-gray-50 text-white mt-6 p-5'>
      <Row>
        <Column align='center'>
          <Text className='text-xs text-gray-600'>
            © {new Date().getFullYear()} Smart Menu
          </Text>
        </Column>
      </Row>
    </Section>
  )
}
