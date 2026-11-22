'use client'

import { Toaster } from 'sonner'
import { useTheme } from 'next-themes'

const ThemeToaster = () => {
  const { resolvedTheme } = useTheme()

  return (
    <Toaster
      position='top-right'
      richColors
      theme={
        resolvedTheme === 'light' || resolvedTheme === 'dark'
          ? resolvedTheme
          : 'system'
      }
    />
  )
}

export default ThemeToaster
