import Navbar from '@/components/layout/Navbar'

interface PublicLayoutProps {
  children: React.ReactNode
}

const PublicLayout = ({ children }: PublicLayoutProps) => {
  return (
    <>
      <Navbar />
      <main className='min-h-screen'>{children}</main>
    </>
  )
}

export default PublicLayout
