<script setup>
import askDetail from './components/askDetail.vue';
import Header from './components/Header.vue';

import{ RouterLink,RouterView } from 'vue-router'
</script>

<template>
  <div class="head">




  <!-- <HomeView/> --></div>
  
 <div class="content">
<RouterView/>
 </div>

 <div class="footer">
  <Footer/>
  </div>
</template>

<style lang="scss" scoped>
.head{
  background-color: rgb(188, 255, 117);
}
.content{
  width: 100vw;
  height: 100vh;
  border: 0px solid rgb(255, 19, 19);
  text-align: center;
}

</style>
