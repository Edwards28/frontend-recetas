import { createRouter, createWebHistory } from 'vue-router'
import { isNotAuthenticatedGuard } from './auth-guard'
import recetasRouter from '@/modules/recetas/routes'
import favoritasRouter from '@/modules/favoritas/routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import(/* webpackChunkName: 'layout' */ '@/layout/AppLayout.vue'),
      children: [
        {
          path: '/',
          name: 'home',
          component: () =>
            import(/* webpackChunkName: 'home' */ '@/modules/home/views/HomeView.vue')
        },
        ...recetasRouter,
        ...favoritasRouter
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: 'login' */ '@/modules/auth/views/LoginView.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () =>
        import(/* webpackChunkName: 'register' */ '@/modules/auth/views/RegisterView.vue')
    },
  ]
})

router.beforeEach(isNotAuthenticatedGuard)

export default router
