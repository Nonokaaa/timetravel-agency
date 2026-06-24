import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { createMistralProxy } from './server/mistralProxy.js'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const mistralMiddleware = createMistralProxy(env)

  const attachMistralApi = (server) => {
    server.middlewares.use(mistralMiddleware)
  }

  return {
    plugins: [
      vue(),
      {
        name: 'mistral-chat-api',
        configureServer: attachMistralApi,
        configurePreviewServer: attachMistralApi,
      },
    ],
  }
})
