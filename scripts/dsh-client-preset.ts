import { readFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { basename, dirname, resolve, sep } from 'node:path'
import { transform } from 'lightningcss'

const PLATFORM_MODULES = [
  'react',
  'react/jsx-runtime',
  'react-dom',
  'react-dom/client',
  '@deepseek-ai/cordis',
  '@deepseek-ai/dsh-client-ui-slots',
  '@deepseek-ai/dsh-client-web-react',
  '@deepseek-ai/dsh-client-ui-primitives',
]
const RUNTIME = '@deepseek-ai/dsh-client-runtime/client'
const EXTERNALS = [...PLATFORM_MODULES, RUNTIME]
const CSS_PREFIX = '\0dsh-css:'
const CSS_SUFFIX = '.mjs'

function assetPath(source, importer) {
  const emitted = resolve(dirname(importer), source)
  if (existsSync(emitted)) return emitted
  const marker = `${sep}lib${sep}types${sep}`
  const boundary = emitted.indexOf(marker)
  return boundary < 0 ? emitted : resolve(emitted.slice(0, boundary), 'src', emitted.slice(boundary + marker.length))
}

export function clientBundle(id) {
  return {
    name: `${id}/client`,
    entry: { client: 'src/client/index.ts' },
    outDir: 'dist',
    format: 'cjs',
    platform: 'browser',
    dts: false,
    sourcemap: true,
    clean: false,
    external: EXTERNALS,
    define: {
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV ?? 'production'),
      'import.meta.env.MODE': JSON.stringify(process.env.NODE_ENV ?? 'production'),
      'import.meta.env': JSON.stringify({ MODE: process.env.NODE_ENV ?? 'production' }),
    },
    noExternal: idValue => EXTERNALS.includes(idValue) ? undefined : true,
    plugins: [{
      name: 'dsh-css-modules-inline',
      resolveId(source, importer) {
        if (!source.endsWith('.module.css')) return null
        return CSS_PREFIX + assetPath(source, importer ?? source) + CSS_SUFFIX
      },
      async load(virtualId) {
        if (!virtualId.startsWith(CSS_PREFIX)) return null
        const fileId = virtualId.slice(CSS_PREFIX.length, -CSS_SUFFIX.length)
        this.addWatchFile(fileId)
        const source = await readFile(fileId)
        const result = transform({ filename: fileId, code: source, cssModules: { pattern: '[hash]_[local]' }, minify: true })
        const classMap = Object.fromEntries(Object.entries(result.exports ?? {}).map(([key, value]) => [key, value.name]))
        const tagId = `${id}/${basename(fileId)}`
        return [
          `const css = ${JSON.stringify(result.code.toString())};`,
          `const tagId = ${JSON.stringify(tagId)};`,
          'if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId) + "]") === null) {',
          '  const tag = document.createElement("style");',
          `  tag.dataset.plugin = ${JSON.stringify(id)};`,
          '  tag.dataset.pluginCss = tagId;',
          '  tag.textContent = css;',
          '  document.head.appendChild(tag);',
          '}',
          `export default ${JSON.stringify(classMap)};`,
        ].join('\n')
      },
    }],
    outputOptions: {
      entryFileNames: 'client.js',
      sourcemapPathTransform: source => basename(source),
      banner: `window.__ModuleLoader__.load({ id: ${JSON.stringify(id)}, factory: (require) => {`,
      footer: 'return module.exports; } });',
      intro: 'var module = { exports: {} }; var exports = module.exports;',
    },
  }
}
