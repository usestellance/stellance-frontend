// app/providers.tsx
"use client";
import { ThemeProvider } from "next-themes";

export function AppThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class" // Required for class-based dark mode
      defaultTheme="system"
      enableSystem
    >
      {children}
    </ThemeProvider>
  );
}
