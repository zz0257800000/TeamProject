<script >
import {RouterLink,RouterView}from 'vue-router';
import {mapState, mapActions}from 'pinia';
import indexState from '../stores/indexState';
export default{
  components:{
    RouterLink
  },
  computed:{
    ...mapState(indexState,["location","locationInfo"])
  },
  methods:{
    ...mapActions(indexState,["getLocation","setLocation"])
    // change(){
    //   this.setLocation(2)
    //   this.getLocation()

    // }
  }
}
</script>

<template>
    <nav class="topNav">   
         <RouterLink class="routerItem" to="/HomeView">HomeView</RouterLink>

      <RouterLink class="routerItem" to="/askDetail">電商</RouterLink>

</nav> 
   <!-- <button @click="change"></button>
  <p>{{ location}}</p> -->
</template>

<style lang="scss" scoped>

.topNav{
    width: 100%;
    height: 100%;
    border-color: aqua;
    font-size: 24pt;
    color: white;
    display: flex;
    justify-content: space-around;

}
a{
    text-decoration: none;
    transition: 0.3ms;
    &:hover{
        color: aqua;
        background-color: rgb(149, 149, 149);
    }
}
</style>

