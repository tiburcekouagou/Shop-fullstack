import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '@/views/AboutView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Auth/LoginView.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/Auth/RegisterView.vue'),
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      children: [
        {
          path: '/',
          name: 'adminboard',
          component: () => import('../components/admin/DashboardComponent.vue'),
          meta: { requiresAuth: true },
        },
        {
          path: '/products',
          name: 'products',
          component: () => import('../components/admin/ProductComponent.vue'),
          meta: { requiresAuth: true },
        },
        {
          path: '/categories',
          name: 'categories',
          component: () => import('../components/admin/CategoryComponent.vue'),
          meta: { requiresAuth: true },
        },
        {
          path: '/users',
          name: 'users',
          component: () => import('../components/admin/UserComponent.vue'),
          meta: { requiresAuth: true },
        },
      ],
      component: import('../views/DashboardView.vue'),
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
    },
  ],
})

export default router
