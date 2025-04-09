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
          path: '/document',
          component: () => import('@/views/document/Document.vue'),
        },
        {
          path: '/community',
          component: () => import('@/views/community/Community.vue'),

          children: [
            {
              path: '',
              component: () => import('@/views/assistant/Assistant.vue'),
              redirect: '/community/assistant'
            },
            {
              path: 'user',
              component: () => import('@/views/user/User.vue'),
            },
            {
              path: 'assistant',
              component: () => import('@/views/assistant/Assistant.vue')
            },
            {
              path: 'forum',
              component: () => import('@/views/forum/Forum.vue')
            },
            {
              path: 'feedback',
              component: () => import('@/views/feedback/Feedback.vue')
            }
          ]

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
