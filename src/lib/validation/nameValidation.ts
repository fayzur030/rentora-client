export const validateName = (name: string): string | null => {
  const trimmedName = name.trim()

  if (!trimmedName) {
    return 'Name is required.'
  }

  if (trimmedName.length < 2) {
    return 'Name must be at least 2 characters.'
  }

  return null
}
