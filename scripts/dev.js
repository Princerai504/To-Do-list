import { spawn } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const API_PORT = process.env.API_PORT ?? '3000'

const useColor = process.stdout.isTTY
const paint = (code, text) => (useColor ? `\u001b[${code}m${text}\u001b[0m` : text)

const tasks = [
  {
    name: 'web',
    color: 36,
    args: [join(root, 'node_modules', 'vite', 'bin', 'vite.js')],
  },
  {
    name: 'api',
    color: 35,
    args: [
      join(root, 'node_modules', 'json-server', 'lib', 'bin.js'),
      'db.json',
      '--port',
      API_PORT,
    ],
  },
]

const children = []
let stopping = false

function stopAll(code) {
  if (stopping) return
  stopping = true
  for (const child of children) {
    if (child.exitCode === null && child.signalCode === null) child.kill()
  }
  process.exitCode = code
}

for (const task of tasks) {
  const child = spawn(process.execPath, task.args, {
    cwd: root,
    env: { ...process.env, FORCE_COLOR: '1' },
    stdio: ['inherit', 'pipe', 'pipe'],
  })
  children.push(child)

  const label = paint(task.color, `[${task.name}]`)

  const forward = (stream, out) => {
    let buffer = ''
    stream.setEncoding('utf8')
    stream.on('data', (chunk) => {
      buffer += chunk
      const lines = buffer.split('\n')
      buffer = lines.pop() ?? ''
      for (const line of lines) out.write(`${label} ${line}\n`)
    })
    stream.on('end', () => {
      if (buffer) out.write(`${label} ${buffer}\n`)
    })
  }

  forward(child.stdout, process.stdout)
  forward(child.stderr, process.stderr)

  child.on('error', (error) => {
    process.stderr.write(`${label} failed to start: ${error.message}\n`)
    stopAll(1)
  })

  child.on('exit', (code, signal) => {
    const reason = signal ? `signal ${signal}` : `exit code ${code ?? 0}`
    process.stdout.write(`${label} stopped (${reason})\n`)
    stopAll(signal || (code ?? 0) === 0 ? 0 : 1)
  })
}

for (const signal of ['SIGINT', 'SIGTERM']) {
  process.on(signal, () => {
    process.stdout.write('\n')
    stopAll(0)
  })
}
