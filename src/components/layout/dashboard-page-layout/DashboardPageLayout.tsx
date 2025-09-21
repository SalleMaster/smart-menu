import { Separator } from '@/components/ui/separator'

type Props = {
  title: string
  children: React.ReactNode
}

export default function DashboardPageLayout({ title, children }: Props) {
  return (
    <div className='px-4 space-y-5'>
      <h2 className='text-xl font-bold'>{title}</h2>

      <Separator />

      {children}
    </div>
  )
}
