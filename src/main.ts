import { createSSRApp } from 'vue'
import App from './App.vue'
import { createAppRouter } from './router'
import { setupI18n } from './i18n'

// SSR requires a fresh app instance per request, therefore we export a function
// that creates a fresh app instance. If using Vuex, we'd also be creating a
// fresh store here.
export function createApp() {
  const app = createSSRApp(App)
  const router = createAppRouter()
  const i18n = setupI18n()
  
  app.use(router)
  app.use(i18n)
  
  return { app, router }
}
