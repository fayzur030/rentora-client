export const validateEmail = (email: string): string | null => {
  if (!email.trim()) {
    return 'Email address is required.'
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if (!emailPattern.test(email)) {
    return 'Please enter a valid email address.'
  }

  return null
}
