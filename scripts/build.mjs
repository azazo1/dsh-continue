import { mkdir, rm, copyFile } from 'node:fs/promises'
import { join } from 'node:path'
import { spawn } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('..', import.meta.url))
const dist = join(root, 'dist')

function run(command, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { cwd: root, stdio: 'inherit', env: process.env })
    child.once('error', reject)
    child.once('exit', code => code === 0 ? resolve() : reject(new Error(`${command} exited with ${code}`)))
  })
}

await rm(dist, { recursive: true, force: true })
await mkdir(dist, { recursive: true })
console.info('Building dsh-continue')
await run(join(root, 'node_modules/.bin/tsc'), ['-p', 'tsconfig.json', '--noEmit'])
await run(join(root, 'node_modules/.bin/tsdown'), ['--config', 'tsdown.config.ts'])
await copyFile(join(dist, 'index.mjs'), join(root, 'index.mjs'))
await copyFile(join(dist, 'client.js'), join(root, 'client.js'))
await copyFile(join(dist, 'client.js.map'), join(root, 'client.js.map'))
await rm(dist, { recursive: true, force: true })
console.info('Built dsh-continue')
