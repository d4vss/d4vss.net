import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        title: 'Home',
        metaTags: [
          {
            name: 'description',
            content: "davs'page"
          },
          {
            property: 'og:description',
            content: "davs'page"
          },
        ]
      }
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/About.vue'),
      // redirect: { name: 'not-found' },
    },
    {
      path: '/projects',
      name: 'projects',
      component: () => import('../views/Projects.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('../views/NotFound.vue')
    }
  ]
})

export default router
