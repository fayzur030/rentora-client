// The profile information used by every role.
// Customer, Owner and Admin all share this exact shape.

export interface Profile {
  name: string
  email: string
  image?: string
  phone?: string
  dateOfBirth?: string
  gender?: string
  address?: string
  city?: string
  state?: string
  country?: string
  postalCode?: string
  bio?: string
  companyName?: string
  website?: string
  preferredLanguage?: string
  timeZone?: string
  role: 'customer' | 'owner' | 'admin'
  status?: 'active' | 'inactive'
  createdAt?: string
}

// The edit form needs every field to be a string.
// Empty strings are easier to bind to inputs than undefined.
export interface ProfileFormValues {
  image: string
  name: string
  email: string
  phone: string
  dateOfBirth: string
  gender: string
  address: string
  city: string
  state: string
  country: string
  postalCode: string
  bio: string
  companyName: string
  website: string
  preferredLanguage: string
  timeZone: string
}
