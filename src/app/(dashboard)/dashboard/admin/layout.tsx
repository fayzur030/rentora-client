import RoleGuard from '@/components/auth/RoleGuard'

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return <RoleGuard allowedRoles={['admin']}>{children}</RoleGuard>
}

export default AdminLayout
