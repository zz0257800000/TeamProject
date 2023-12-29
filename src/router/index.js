import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/UserPage/signUp",
      name: "signUp",
      component: () => import("../views/UserPage/signUp.vue"),
    },
    {
      path: "/UserPage/checkoutshopping/:productId",
      name: "checkoutshopping",
      component: () => import("../views/UserPage/checkoutshopping.vue"),
    },
    {
      path: "/UserPage/memberInfo",
      name: "memberInfo",
      component: () => import("../views/UserPage/memberInfo.vue"),
    },
    {
      path: "/UserPage/loginPage",
      name: "loginPage",
      component: () => import("../views/UserPage/loginPage.vue"),
    },
    // {
    //   path: "/UserPage/shoppingCart/:productId",
    //   name: "shoppingCart",
    //   component: () => import("../views/UserPage/shoppingCart.vue"),
    // },
    {
      path: "/UserPage/forgotPasswordPage",
      name: "forgotPasswordPage",
      component: () => import("../views/UserPage/forgotPasswordPage.vue"),
    },
    {
      path: "/UserActionShop/bidOrder/",
      name: "bidOrder",
      component: () => import("../views/UserActionShop/bidOrder.vue"),
      
    },
    {
      path: "/UserActionShop/cancelBid/",
      name: "cancelBid",
      component: () => import("../views/UserActionShop/cancelBid.vue"),
    },
    {
      path: "/UserActionShop/orderCompleted/",
      name: "orderCompleted",
      component: () => import("../views/UserActionShop/orderCompleted.vue"),
    },
    {
      path: "/UserActionShop/shippedOder/",
      name: "shippedOder",
      component: () => import("../views/UserActionShop/shippedOder.vue"),
    },
    {
      path: "/UserPage/actionShop/",
      name: "actionShop",
      component: () => import("../views/UserActionShop/actionShop.vue"),
    },
    {
      path: "/UserPage/sellerStore/:userId",
      name: "sellerStore",
      component: () => import("../views/UserActionShop/sellerStore.vue"),
      props: true,
    },
    {
      path: "/UserPage/addNewProduct",
      name: "addNewProduct",
      component: () => import("../views/UserActionShop/addNewProduct.vue"),
    },

    {
      path: "/UserPage/buyingList",
      name: "buyingList",
      component: () => import("../views/UserPage/buyingList.vue"),
    },
    {
      path: "/UserPage/waitingReceipt",
      name: "waitingReceipt",
      component: () => import("../views/UserPage/waitingReceipt.vue"),
    },
    {
      path: "/UserPage/buyCancelOrder",
      name: "buyCancelOrder",
      component: () => import("../views/UserPage/buyCancelOrder.vue"),
    },
    {
      path: "/UserPage/completeReceipt",
      name: "completeReceipt",
      component: () => import("../views/UserPage/completeReceipt.vue"),
    },
    {
      path: "/UserPage/developerPage",
      name: "developerPage",
      component: () => import("../views/UserPage/developerPage.vue"),
    },
    {
      path: "/UserPage/productPage/:productId",
      name: "productPage",
      component: () => import("../views/UserPage/productPage.vue"),
    },
    {
      path: "/test",
      name: "test",
      component: () => import("../views/TestView.vue"),
    },
    {
      path: "/UserPage/shoppingCart",
      name: "shoppingCart",
      component: () => import("../views/UserPage/shoppingCart.vue"),
    },
    {
      path: "/UserPage/cartToCheckOut",
      name: "cartToCheckOut",
      component: () => import("../views/UserPage/cartToCheckOut.vue"),
    },
    {
      path: "/UserPage/Watchfeedback",
      name: "Watchfeedback",
      component: () => import("../views/UserPage/Watchfeedback.vue"),
    },
    {
      path: "/UserPage/ChangeForgetPassword",
      name: "ChangeForgetPassword",
      component: () => import("../views/UserPage/ChangeForgetPassword.vue"),
    },
    {
      path: "/UserPage/forgotPasswordPage",
      name: "forgotPasswordPage",
      component: () => import("../views/UserPage/forgotPasswordPage.vue"),
    },
    {
      path: "/UserPage/ChangePassword",
      name: "ChangePassword",
      component: () => import("../views/UserPage/ChangePassword.vue"),
    },
    {
      path: "/UserPage/complainService",
      name: "complainService",
      component: () => import("../views/UserPage/complainService.vue"),
    },
    {
      path: "/UserProduct",
      name: "userProduct",
      component: () => import("../views/UserActionShop/UserProductView.vue"),
    },
    {
      path: "/:product/:id/data",
      name: "productData",
      component: () => import("../views/UserActionShop/ProductSaleData.vue"),
    },
  ],
});

export default router;
