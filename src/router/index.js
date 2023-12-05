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
    {
      path: '/UserPage/shoppingCart',
      name: 'shoppingCart',
      component: () => import('../views/UserPage/shoppingCart.vue')
    }, 
    {
      path: '/UserPage/forgotPasswordPage',
      name: 'forgotPasswordPage',
      component: () => import('../views/UserPage/forgotPasswordPage.vue')
    }, 
    {
      path: '/UserPage/actionShop',
      name: 'actionShop',
      component: () => import('../views/UserActionShop/actionShop.vue')
    },  
    {
      path: '/UserPage/addNewProduct',
      name: 'addNewProduct',
      component: () => import('../views/UserActionShop/addNewProduct.vue')
    },  
  ]
})

export default router
