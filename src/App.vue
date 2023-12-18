<script setup>
import navbar from '../src/components/navbar.vue';
import navbar1 from '../src/components/navbar1.vue';

import { RouterLink, RouterView } from 'vue-router'
//匯入導覽列
</script>

<template>
  <div class="showmain">
  <navbar />

  <RouterView />
  <navbar1/>

</div>
</template>

<style scoped>
.showmain{
border: 0;
width: 100vw;

}
</style>
