import { createRouter, createMemoryHistory, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

// 路由配置
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/layout/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('@/page/home/index.vue')
      },
      {
        path: 'about',
        name: 'About',
        component: () => import('@/page/about/index.vue')
      },
      {
        path: 'projects',
        name: 'Projects',
        component: () => import('@/page/projects/index.vue')
      },
      {
        path: 'contact',
        name: 'Contact',
        component: () => import('@/page/contact/index.vue')
      }
    ]
  },
  // 404页面
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/page/not-found/index.vue')
  }
]

// 导出路由创建函数，方便客户端和服务端分别使用
export function createAppRouter() {
  return createRouter({
    // 根据环境使用不同的历史模式
    history: import.meta.env.SSR 
      ? createMemoryHistory() 
      : createWebHistory(),
    routes,
    // 滚动行为配置
    scrollBehavior(to, _from, savedPosition) {
      // 如果有保存的位置，则使用它
      if (savedPosition) {
        return savedPosition
      }
      // 如果有hash，则滚动到hash对应的元素
      if (to.hash) {
        return { el: to.hash, behavior: 'smooth' }
      }
      // 否则滚动到顶部
      return { top: 0, behavior: 'smooth' }
    }
  })
}

// 导出路由实例（用于客户端）
const router = createAppRouter()
export default router
