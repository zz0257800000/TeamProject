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
      path: '/UserPage/signUp',
      name: 'signUp',
      component: () => import('../views/UserPage/signUp.vue')
    }, 
    {
      path: '/UserPage/loginPage',
      name: 'loginPage',
      component: () => import('../views/UserPage/loginPage.vue')
    }, 

  ]
})

export default router
