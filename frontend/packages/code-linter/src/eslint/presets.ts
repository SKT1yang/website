import { hasVue } from './env'
import { glsec, ignores, javascript, typescript, vue } from './configs'
import type { Linter } from 'eslint'
import type { I18nWrapConfig } from './configs'

/** Ignore common files and include javascript support */
const presetJavaScript = [...ignores(), ...javascript()]
/** Includes `presetJavaScript` and typescript support */
const presetBasic = [...presetJavaScript, ...typescript]
/**
 * Includes
 * - `presetBasic` (JS+TS) support
 * - `presetLangsExtensions` (markdown, yaml, jsonc) support
 * - Vue support
 * - UnoCSS support (`uno.config.ts` is required)
 * - Prettier support
 */
const presetAll = [...presetBasic, ...vue]

/**
 *
 * @param config
 * @param features
 * @returns
 */
function eslint(
  config: Linter.Config | Linter.Config[] = [],
  options?: Partial<{
    /** Vue support. Auto-enable. */
    vue: boolean
    glsec: boolean
    i18nWrap: I18nWrapConfig
  }>
): Linter.Config[] {
  const { vue: enableVue = hasVue, glsec: enableGlsec = true, i18nWrap } = options || {}
  const configs = [...presetBasic]
  if (enableVue) {
    configs.push(...vue)
  }
  if (enableGlsec) {
    configs.push(...glsec(i18nWrap))
  }
  if (Object.keys(config).length > 0) {
    configs.push(...(Array.isArray(config) ? config : [config]))
  }

  return configs
}

export { eslint, presetBasic as basic, presetAll as all }
