import Link from 'next/link'
import { House, LockKeyhole, LogIn, ShieldAlert } from 'lucide-react'

import { Button } from '@/components/ui/button'
import Logo from '@/components/shared/Logo'

const Unauthorized = () => {
  return (
    <main className='relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4 py-10 sm:px-6'>
      <div
        aria-hidden='true'
        className='pointer-events-none absolute inset-0 overflow-hidden'
      >
        <div className='absolute -left-24 -top-24 size-80 rounded-full bg-accent/10 blur-3xl' />
        <div className='absolute -bottom-28 -right-20 size-96 rounded-full bg-primary/10 blur-3xl' />
      </div>

      <section
        aria-labelledby='unauthorized-title'
        className='relative grid w-full max-w-5xl overflow-hidden rounded-3xl border border-border bg-card shadow-2xl shadow-primary/10 md:grid-cols-[0.85fr_1.15fr]'
      >
        <div className='relative flex min-h-64 flex-col justify-between overflow-hidden bg-primary p-7 text-primary-foreground sm:p-10 md:min-h-[34rem]'>
          <div
            aria-hidden='true'
            className='absolute -right-20 -top-20 size-64 rounded-full border border-primary-foreground/10'
          />
          <div
            aria-hidden='true'
            className='absolute -bottom-24 -left-24 size-72 rounded-full border border-primary-foreground/10'
          />

          <div className='relative flex size-14 items-center justify-center rounded-2xl border border-primary-foreground/15 bg-card/10'>
            <LockKeyhole className='size-6' aria-hidden='true' />
          </div>

          <div className='relative mt-10 md:mt-0'>
            <p className='text-xs font-semibold tracking-[0.2em] text-primary-foreground/65 uppercase'>
              Restricted area
            </p>
            <p className='mt-3 font-heading text-7xl font-extrabold leading-none tracking-tight sm:text-8xl'>
              403
            </p>
            <p className='mt-4 max-w-xs text-sm leading-6 text-primary-foreground/75'>
              This part of Rentora is reserved for authorized accounts.
            </p>
          </div>
        </div>

        <div className='flex flex-col justify-center p-6 sm:p-10 md:p-12'>
          <Logo darkText />

          <div className='mt-10 sm:mt-14'>
            <div className='inline-flex items-center gap-2 rounded-full border border-destructive/25 bg-destructive/10 px-3 py-1.5 text-xs font-semibold text-destructive'>
              <ShieldAlert className='size-4' aria-hidden='true' />
              Access denied
            </div>

            <h1
              id='unauthorized-title'
              className='mt-5 max-w-lg font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl'
            >
              You don&apos;t have permission to view this page.
            </h1>

            <p className='mt-4 max-w-lg text-sm leading-6 text-muted-foreground sm:text-base'>
              Your account may not have the access level this page requires. If
              you think this is a mistake, please contact your administrator.
            </p>
          </div>

          <div className='mt-8 flex flex-col gap-3 sm:flex-row'>
            <Button
              render={<Link href='/' />}
              className='h-11 w-full gap-2 px-5 sm:w-auto'
            >
              <House aria-hidden='true' />
              Back to home
            </Button>

            <Button
              variant='outline'
              render={<Link href='/login' />}
              className='h-11 w-full gap-2 px-5 sm:w-auto'
            >
              <LogIn aria-hidden='true' />
              Sign in
            </Button>
          </div>

          <div className='mt-10 border-t border-border pt-5'>
            <p className='text-xs leading-5 text-muted-foreground'>
              Error code <span className='font-semibold text-foreground'>403</span>
              <span className='mx-2 text-border' aria-hidden='true'>
                |
              </span>
              Need access? Contact your administrator.
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Unauthorized
