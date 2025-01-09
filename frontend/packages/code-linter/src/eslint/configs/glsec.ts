import type { Linter } from 'eslint'
import i18nWrapPlugin from 'eslint-plugin-i18n-wrap'

type I18nWrapConfig = {
  open: boolean
  auto: false
  pathSuffix: string
  staticEntry: string
}

export function glsec(i18nWrap?: Partial<I18nWrapConfig>) {
  const {
    open = false,
    auto = false,
    pathSuffix = '/useLanguage.ts',
    staticEntry = 'entry/languages'
  } = i18nWrap || {}
  const result: Linter.Config[] = [
    {
      name: 'glsec',
      languageOptions: {
        globals: {
          defineOptions: 'readonly',
          VoerkaI18n: 'readonly',
          t: 'writable',
          OEM_SETTINGS: 'writable',
          __APP_GLOBAL_ROUTER_INSTANCE__: 'writable',
          __APP_GLOBAL_SCHEDULER_INSTANCE__: 'writable',
          __APP_GLOBAL_STORE_INSTANCE__: 'writable',
          __APP_GLOBAL_THEME_INSTANCE__: 'writable'
        }
      }
    }
  ]
  if (open) {
    const config = Object.assign(i18nWrapPlugin.configs.all, {
      rules: {
        'i18n/wrap-i18n-function': 'error',
        'i18n/import-i18n-function': [
          'error',
          {
            auto,
            pathSuffix,
            staticEntry
          }
        ]
      }
    })
    result.push(config)
  }
  return result
}

export type { I18nWrapConfig }
