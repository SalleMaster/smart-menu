import getSession from '@/lib/getSession'
import { Suspense } from 'react'
import NavBar, { NavBarSkeleton } from './_components/NavBar'

export default function Header() {
  const sessionPromise = getSession()

  return (
    <header className='sticky top-0 bg-background shadow-xs z-10'>
      <nav>
        <Suspense fallback={<NavBarSkeleton />}>
          <NavBar sessionPromise={sessionPromise} />
        </Suspense>
      </nav>
    </header>
  )
}
