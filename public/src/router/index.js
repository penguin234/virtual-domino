import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/wiki',
      name: 'wiki',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/WikiHomeView.vue'),

      children: [
        {
          path: 'domino',
          name: 'domino',
          component: () => import('../views/wiki/StaticDomino.vue')
        },
        {
          path: 'dominoframe',
          name: 'dominoframe',
          component: () => import('../views/wiki/DominoFrame.vue')
        }
      ]
    },
  ]
})

export default router
