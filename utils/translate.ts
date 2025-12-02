import { useLanguage } from '@/components/language-provider'

export function useTranslate() {
  const { t } = useLanguage()
  return t
}

// This export is to satisfy module requirements but should not be used directly
export const t = {} // Placeholder for module resolution

// For direct usage in components
export { useLanguage }
