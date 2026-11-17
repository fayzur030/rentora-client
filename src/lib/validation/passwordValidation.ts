export interface PasswordRequirementStatus {
  hasUppercase: boolean
  hasLowercase: boolean
  hasMinimumLength: boolean
}

export const getPasswordRequirementStatus = (
  password: string
): PasswordRequirementStatus => {
  return {
    hasUppercase: /[A-Z]/.test(password),
    hasLowercase: /[a-z]/.test(password),
    hasMinimumLength: password.length >= 6,
  }
}

export const validatePassword = (password: string): string | null => {
  if (!password) {
    return 'Password is required.'
  }

  const status = getPasswordRequirementStatus(password)

  if (!status.hasUppercase) {
    return 'Password must contain at least one uppercase letter.'
  }

  if (!status.hasLowercase) {
    return 'Password must contain at least one lowercase letter.'
  }

  if (!status.hasMinimumLength) {
    return 'Password must be at least 6 characters long.'
  }

  return null
}
