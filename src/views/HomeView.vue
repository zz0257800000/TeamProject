<script >
import { RouterLink, } from 'vue-router'
import Header from "../components/Header.vue"
export default {
  data() {
    return {
      imageUrl: null,
      isZoomed: false,
      currentDate: new Date().toLocaleString(),
    }
  },
  components: {
    RouterLink,
    
    Header
  },
  created() {
    // 在组件创建时启动日期更新
    this.updateDate();
  },
  methods: {
    updateDate() {
      // 更新当前日期和时间
      this.currentDate = new Date().toLocaleString();
      // 每秒更新一次
      setTimeout(this.updateDate, 1000);
    },
  },

}

</script>

<template>

  <Header/>
  
  

</template>
<style lang="scss" scoped>

</style>
