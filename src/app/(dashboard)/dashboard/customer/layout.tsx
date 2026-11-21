import RoleGuard from '@/components/auth/RoleGuard'

const CustomerLayout = ({ children }: { children: React.ReactNode }) => {
  return <RoleGuard allowedRoles={['customer']}>{children}</RoleGuard>
}

export default CustomerLayout
