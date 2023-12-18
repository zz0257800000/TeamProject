<script setup>
import navbar from '../src/components/navbar.vue';
import navbar1 from '../src/components/navbar1.vue';

import { RouterLink, RouterView } from 'vue-router'
//匯入導覽列
</script>

<template>
  <navbar />

  <RouterView />
  <navbar1/>


</template>

<style scoped></style>
