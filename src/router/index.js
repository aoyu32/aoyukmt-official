import { createRouter, createWebHistory } from 'vue-router'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/views/layout/Layout.vue'),
      redirect: '/index',
      children: [
        {
          path: '/index',
          component: () => import('@/views/index/Index.vue')
        },
        {
          path: '/download',
          component: () => import('@/views/download/Download.vue')
        },
        {
          path: '/document', // 添加动态路由参数 :id
          name: 'Document', // 路由名称
          component: () => import('@/views/document/Document.vue'),
          props: true, // 让路由参数作为 props 传递给组件
        },
        {
          path: '/assistant',
          component: () => import('@/views/assistant/Assistant.vue')
        },
        {
          path: '/updatelog',
          component: () => import('@/views/updatelog/Updatelog.vue')
        }
      ]
    }
  ],
})

export default router
