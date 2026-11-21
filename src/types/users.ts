export type UserRole = 'owner' | 'customer' | 'admin'

export interface Users {
  _id: string
  name: string
  email: string
  createdAt: string
  role: UserRole
}

export interface RoleChange {
  userId: string
  userName: string
  newRole: UserRole
}
