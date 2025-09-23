export default async function Page(props: PageProps<'/[organizationSlug]'>) {
  const params = await props.params
  const { organizationSlug } = params

  return <div>Smart Menu Page for {organizationSlug}</div>
}
