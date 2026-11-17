interface PublicLayoutProps {
  children: React.ReactNode
}

const PublicLayout = ({ children }: PublicLayoutProps) => {
  return (
    <>
      <main className='min-h-screen'>{children}</main>
    </>
  )
}

export default PublicLayout
