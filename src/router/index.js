import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/day-1',
      name: 'day-1',
      component: () => import('../views/day-1//day-1.vue')
    },
  ],
})

export default router
