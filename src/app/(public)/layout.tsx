import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/shared/Footer'

interface PublicLayoutProps {
  children: React.ReactNode
}

const PublicLayout = ({ children }: PublicLayoutProps) => {
  return (
    <>
      <Navbar />
      <main className='min-h-screen'>{children}</main>
      <Footer />
    </>
  )
}

export default PublicLayout
