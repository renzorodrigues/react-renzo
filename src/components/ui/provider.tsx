"use client"

import { CacheProvider } from "@chakra-ui/next-js"
import { ChakraProvider } from "@chakra-ui/react"
import { ColorModeProvider } from "./color-mode"

export function Provider({ children }: { children: React.ReactNode }) {
  return (
    <CacheProvider>
      <ChakraProvider>
        <ColorModeProvider>{children}</ColorModeProvider>
      </ChakraProvider>
    </CacheProvider>
  )
}
