'use client'

import { ThemeProvider as NextThemesProvider } from 'next-themes'
import type { ComponentProps } from 'react'

const ThemeProvider = (props: ComponentProps<typeof NextThemesProvider>) => (
  <NextThemesProvider
    attribute='class'
    defaultTheme='system'
    enableSystem
    disableTransitionOnChange
    {...props}
  />
)

export default ThemeProvider
