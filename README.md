# RTQ CRUD

Redux Toolkit + React Query CRUD app with `json-server` as the mock API.

## Getting started

```bash
npm install
npm run dev
```

`npm run dev` starts **both** servers in one terminal:

- `[web]` Vite dev server -> http://localhost:5173
- `[api]` json-server on db.json -> http://localhost:3000

Logs from each are prefixed with `[web]` / `[api]`. Press `Ctrl+C` once to stop both
(if one process crashes, the other is stopped too).

| Command          | What it does                                     |
| ---------------- | ------------------------------------------------ |
| `npm run dev`    | Vite + json-server together (one terminal)       |
| `npm run dev:web`| Only the Vite dev server                         |
| `npm run dev:api`| Only json-server |
| `npm run server` | Same as `dev:api`, kept for the existing workflow |

`dev.js` reads the port from `API_PORT`, so you can move the mock API with
`$env:API_PORT=3001; npm run dev` (PowerShell) or `API_PORT=3001 npm run dev` (bash).
Note that `dev:api` and `server` pass `--port 3000` directly and ignore `API_PORT`.

---

## React + Vite template

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.
