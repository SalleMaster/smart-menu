export default async function Page(
  props: PageProps<'/[organizationSlug]/dashboard'>
) {
  const params = await props.params
  const { organizationSlug } = params

  return <div>Organization Dashboard Page for {organizationSlug}</div>
}
