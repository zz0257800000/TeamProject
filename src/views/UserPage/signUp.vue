<script>
export default {
    data() {
        return {
        
        }
    },
    methods: {
     
       
    },
    components: {
      
}}
</script>

<template>
    <RouterLink class="btn" to="/">返回首頁</RouterLink>
    <div class="signup">
        <img src="../../../public/1.jpg" width="700"  height="500"  alt="">

       <div class="signupRIG"> 
        <div>
    <h1>註冊</h1>
    <form @submit.prevent="registerUser">
      <label for="username">用户名:</label>
      <input type="text" id="username" v-model="username" />
      <label for="password">密码:</label>
      <input type="password" id="password" v-model="password" />
      <button type="submit">注册</button>
    </form>
  </div>
  </div>
    </div>

</template>

<style lang="scss" scoped>
.btn{
    font-size: 16pt;
    margin: 10px;
    border-radius: 10px;
    padding: 10px;
    width: 10vw;
    background-color: rgb(223, 223, 223);
}
.signup{
    margin: 0;
    height: 100vh;
    width: 100vw;
    display: flex;
    margin: 10px;
    justify-content: space-around;
    .signupRIG{
        border: 1px solid black;

    }
}

</style>