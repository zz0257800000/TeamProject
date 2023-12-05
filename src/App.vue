<script setup>
import navbar from '../src/components/navbar.vue';
import navbar1 from '../src/components/navbar1.vue';

import { RouterLink, RouterView } from 'vue-router'
//匯入導覽列
</script>

<template>
  <navbar />

<div class="page">
  <RouterView />
<<<<<<< HEAD
</div>
=======
  <navbar1/>

>>>>>>> 9f890cc (445)

</template>

<style scoped>
.page{
  margin-top: 20px;
}
</style>
