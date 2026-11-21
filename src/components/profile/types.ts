// Supported user roles on Rentora
export type UserRole = 'customer' | 'owner' | 'admin'

/**
 * Standard Profile Interface
 * Strictly contains the 5 required assignment fields plus the user's role.
 */
export interface Profile {
  name: string
  email: string
  image?: string
  phone?: string
  address?: string
  role?: UserRole
  createdAt?: string
}

/**
 * Form values used when updating profile information in the Edit Dialog
 */
export interface ProfileFormValues {
  name: string
  email: string
  image: string
  phone: string
  address: string
}
