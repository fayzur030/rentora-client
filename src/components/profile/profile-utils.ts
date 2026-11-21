// Small helpers shared by the profile components.

// Turns "Ayesha Rahman" into "AR" for the avatar fallback.
export const getInitials = (name: string) => {
  const parts = name.trim().split(' ').filter(Boolean)

  if (parts.length === 0) return 'U'
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase()

  const firstLetter = parts[0].charAt(0)
  const lastLetter = parts[parts.length - 1].charAt(0)

  return `${firstLetter}${lastLetter}`.toUpperCase()
}

// Shows a stored date such as "1996-04-18" as "April 18, 1996".
export const formatProfileDate = (value?: string) => {
  if (!value) return ''

  const date = new Date(value)

  if (Number.isNaN(date.getTime())) return value

  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  })
}

// Shows only the month and year for the "Member since" line.
export const formatMemberSince = (value?: string) => {
  if (!value) return 'Member since not available'

  const date = new Date(value)

  if (Number.isNaN(date.getTime())) return 'Member since not available'

  const monthAndYear = date.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  })

  return `Member since ${monthAndYear}`
}
