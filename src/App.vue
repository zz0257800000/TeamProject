<script setup>
import navbar from '../src/components/navbar.vue';

import { RouterLink, RouterView } from 'vue-router'
//匯入導覽列
</script>

<template>
  <navbar />

<div class="page">
  <RouterView />
</div>

</template>

<style scoped>
.page{
  margin-top: 20px;
}
</style>
