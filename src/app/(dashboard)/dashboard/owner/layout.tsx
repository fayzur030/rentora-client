import RoleGuard from '@/components/auth/RoleGuard'

const OwnerLayout = ({ children }: { children: React.ReactNode }) => {
  return <RoleGuard allowedRoles={['owner']}>{children}</RoleGuard>
}

export default OwnerLayout
