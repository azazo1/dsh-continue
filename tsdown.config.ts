import { clientBundle } from './scripts/dsh-client-preset.ts'

export default () => [
  {
    entry: { index: 'src/index.ts' },
    outDir: 'dist',
    format: 'esm',
    platform: 'node',
    target: 'es2024',
    dts: false,
    clean: false,
  },
  clientBundle('dsh-continue'),
]
