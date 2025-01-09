import { join, resolve } from 'node:path'
import { execa } from 'execa'
import fg from 'fast-glob'
import fs from 'fs-extra'

import { afterAll, beforeAll, it } from 'vitest'

beforeAll(async () => {
  await fs.rm('_fixtures', { recursive: true, force: true })
})
afterAll(async () => {
  await fs.rm('_fixtures', { recursive: true, force: true })
})

runWithConfig('all')

function runWithConfig(name: string) {
  it.concurrent(
    name,
    async ({ expect }) => {
      const from = resolve('fixtures/input')
      const output = resolve('fixtures/output', name)
      const target = resolve('_fixtures', name)

      await fs.copy(from, target, {
        filter: (src) => {
          return !src.includes('node_modules')
        }
      })
      await fs.writeFile(
        join(target, 'eslint.config.js'),
        `
// @ts-check
import { tsImport } from 'tsx/esm/api'
/** @type {typeof import('../../src/index.ts')} */
const { eslint } = await tsImport('../../src/index.ts', import.meta.url)
export default eslint([], { enableVue: true, enableReact: false })
  `
      )

      await execa('npx', ['eslint', '.', '--fix'], {
        cwd: target,
        stdio: 'pipe'
      })

      const files = await fg('**/*', {
        ignore: ['node_modules', 'eslint.config.js'],
        cwd: target
      })

      await Promise.all(
        files.map(async (file) => {
          const content = await fs.readFile(join(target, file), 'utf-8')
          const source = await fs.readFile(join(from, file), 'utf-8')
          const outputPath = join(output, file)
          if (content === source) {
            if (fs.existsSync(outputPath)) await fs.remove(outputPath)
            return
          }
          await expect.soft(content).toMatchFileSnapshot(join(output, file))
        })
      )
    },
    30_000
  )
}

