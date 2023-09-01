import { TOKEN_NAME } from '@/global'
import { localCache } from '@/utils'
import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/main'
    },
    {
      path: '/login',
      component: () => import('@/views/login/login.vue')
    },
    {
      path: '/main',
      name: 'main',
      component: () => import('@/views/main/main.vue')
    },
    {
      path: '/:pathMath(.*)',
      component: () => import('@/components/not-found.vue')
    }
  ]
})

// 导航守卫
// 参数: to(跳转到的位置)/from(从哪里跳转过来)
// 返回值: 返回值决定导航的路径(不返回或者返回undefined, 默认跳转)
// 举个栗子: / => /main
// to: /main from: / 返回值: /abc
router.beforeEach((to) => {
  if (to.path.startsWith('/main') && !localCache.getCache(TOKEN_NAME)) {
    return '/login'
  }
})

export default router
