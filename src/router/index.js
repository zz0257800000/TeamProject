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
      path: '/askHome',
      name: 'askHome',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/askHome.vue')
    },
    {
      path: '/Vfor',
      name: 'Vfor',
      component: () => import('../views/Vfor.vue')
    },
    {
      path: '/HomeWork',
      name: 'HomeWork',
      component: () => import('../views/HomeWork.vue')
    },
    {
      path: '/child2',
      name: 'child2',
      component: () => import('../views/child2.vue')
    }, 
    
    
    {
      path: '/askDetail',
      name: 'askDetail',
      component: () => import('../components/askDetail.vue')
    }, 
    {
      path: '/signUp',
      name: 'signUp',
      component: () => import('../views/askAllPage/signUp.vue')
    }, 
   
   
    
  ]
})

export default router
