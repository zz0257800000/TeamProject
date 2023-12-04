import { ref } from "vue";
import { defineStore } from "pinia";


export const useDisplayStore = defineStore("display", () => {


    const showLogin = ref(false);

    const showLoginPage = () => {
        showLogin.value = true;
    };
  
    const closeLoginPage = () => {
        showLogin.value = false;
    };

  return { 
    showLogin,
    showLoginPage,
    closeLoginPage,







  };
});